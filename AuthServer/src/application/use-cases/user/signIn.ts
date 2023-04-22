import getConfigs from "../../../configs";
import tokenRepositoryInteraface from "../../repository/tokensRepositoryInteraface";
import userRepositoryInteraface from "../../repository/userRepositoryInteraface";
import authServiceInterface from "../../services/authServices";
import validatorInteraface from "../../services/validatorInteraface";
import { userEntity } from "../../../entities";
import { IUser } from "../../../entities/user.normal";

export default async function userSignin(
  authService: ReturnType<typeof authServiceInterface>,
  userRepository: ReturnType<typeof userRepositoryInteraface>,
  tokenRepository: ReturnType<typeof tokenRepositoryInteraface>,
  validator: ReturnType<typeof validatorInteraface>,
  createError,
  email,
  idToken: string
) {
  const config = getConfigs();

  try {
    await validator.isValidJwt(idToken as string);
  } catch (error) {
    throw createError(400, error);
  }

  // verfy idToken and retrive userData from firebase
  const user = await authService.verifyIdToken(idToken);

  // check for existing data
  let existingData: IUser | null;
  try {
    existingData = await userRepository.getById(user.uid);
  } catch (error) {
    throw createError(500, "Faild to fetch user data");
  }
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

    try {
      await userRepository.add(newUserData.getSafeData());
    } catch (error) {
      throw createError(500, "Error creating user");
    }
  }

  if (!existingData || !existingData.emailVerified) {
    const otp = await authService.createOtp(user.uid, "signin/emailVerify");
    try {
      await email.sendOtp(user.email, `${otp}`);
    } catch (error) {
      throw createError(
        500,
        "Error while sending otp. Please try after sometime."
      );
    }
    throw createError(403, "You must verify your email to login", {
      action: config.actions.VERIFY_EMAIL_AT_SIGNIN,
    });
  }

  // ----- TOKENS -----
  const tokens = await authService.tokensForUser(user.uid);

  try {
    await tokenRepository.add(user.uid, tokens.refreshToken);
    await userRepository.update(user.uid, { lastLogin: new Date() });
  } catch (error) {
    console.log(error);
    throw createError(500, "Faild to login, Error updating login status");
  }

  if (existingData) {
    return {
      ...tokens,
      email: existingData.email,
      photoURL: existingData.photoURL,
      name: existingData.name,
    };
  }

  return {
    ...tokens,
    email: user.email,
    photoURL: user.photoURL,
    name: user.displayName,
  };
}
