import getConfigs from "../../../configs";
import tokenRepositoryInteraface from "../../repository/tokensRepositoryInteraface";
import userRepositoryInteraface from "../../repository/userRepositoryInteraface";
import authServiceInterface from "../../services/authServices";
import validatorInteraface from "../../services/validatorInteraface";
import { userEntity } from "../../../entities";
import otpRepositoryInterface from "../../repository/otpRepositoyInteraface";
import GetJwt from "dynotxt-common-services/build/jwt";
import GetUtils from "dynotxt-common-services/build/utils";
import GetEmail from "dynotxt-common-services/build/email";

export default async function userSignin(
  authService: authServiceInterface,
  userRepository: userRepositoryInteraface,
  tokenRepository: tokenRepositoryInteraface,
  otpRepository: otpRepositoryInterface,
  validator: validatorInteraface,
  jwtService: GetJwt,
  emailService: GetEmail,
  utilsService: GetUtils,
  idToken: string
) {
  const config = getConfigs();

  await validator.isValidJwt(idToken as string).catch(utilsService.throwCustomError(400, "Invalid token"));

  // verfy idToken and retrive userData from firebase
  const user = await authService.verifyIdToken(idToken);

  // check for existing data
  const existingData = await userRepository.getById(user.uid).catch(utilsService.throwInternalError());

  if (!existingData) {
    // creates and saves new user
    const newUserData = await userEntity({
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      provider: user.providerData[0].providerId,
      createdAt: user.metadata.creationTime,
      lastLogin: user.metadata.lastSignInTime,
      lastRefresh: user.metadata.lastRefreshTime,
      photoURL: user.photoURL,
      phone: user.phoneNumber,
      disabled: user.disabled,
    });

    // saves new user Data
    await userRepository.add(newUserData.getSafeData()).catch(utilsService.throwInternalError("Error creating user"));
  }

  if (existingData?.disabled) throw utilsService.createError(401, "You account is disabled");

  if (!existingData || !existingData.emailVerified) {
    const otp = await authService.createOtp();
    try {
      await otpRepository.add({
        uid: user.uid,
        reason: config.actions.VERIFY_EMAIL_AT_SIGNIN,
        otp,
      });
      await emailService.sendOtpWithCommonTemplate(user.email, `${otp}`);
    } catch (error) {
      throw utilsService.createError(500, "Error while sending otp. Please try after sometime.");
    }
    throw utilsService.createError(403, "You must verify your email to login", {
      action: config.actions.VERIFY_EMAIL_AT_SIGNIN,
    });
  }

  // ----- TOKENS -----
  const tokens = jwtService.generateTokens({ uid: user.uid });

  try {
    await tokenRepository.add(user.uid, tokens.refreshToken);
    await userRepository.update(user.uid, { lastLogin: new Date() });
  } catch (error) {
    throw utilsService.createError(500, "Faild to login, Error updating login status");
  }

  await emailService.sendNewLoginAlert(existingData?.email ?? user.email).catch(utilsService.throwInternalError());

  if (existingData) {
    return {
      ...tokens,
      email: existingData.email,
      photoURL: existingData.photoURL,
      uid: existingData.uid,
      name: existingData.name,
    };
  }

  return {
    ...tokens,
    email: user.email,
    photoURL: user.photoURL,
    uid: user.uid,
    name: user.displayName,
  };
}
