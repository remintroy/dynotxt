import GetUtils from "dynotxt-common-services/build/utils";
import getConfigs from "../../../configs";
import otpRepositoryInterface from "../../repository/otpRepositoyInteraface";
import tokenRepositoryInteraface from "../../repository/tokensRepositoryInteraface";
import userRepositoryInteraface from "../../repository/userRepositoryInteraface";
import caseUserAccessCheck from "./user-access-checks";
import GetJwt from "dynotxt-common-services/build/jwt";
import GetEmail from "dynotxt-common-services/build/email";

export default async function verifyEmail(
  userRepository: userRepositoryInteraface,
  otpRepository: otpRepositoryInterface,
  emailService: GetEmail,
  tokernRepository: tokenRepositoryInteraface,
  jwtService: GetJwt,
  utilService: GetUtils,
  userId: string,
  otp: string
) {
  try {
    const config = getConfigs();

    if (!otp) throw utilService.createError(400, "OTP is required");
    if (!userId) throw utilService.createError(400, "UID is required");

    const otpDataFromDb = await otpRepository
      .getByData({
        otp,
        uid: userId,
        reason: config.actions.VERIFY_EMAIL_AT_SIGNIN,
      })
      .catch(utilService.throwInternalError());

    if (!otpDataFromDb) throw utilService.createError(400, "Invalid otp");

    const existingData = await caseUserAccessCheck(userRepository, utilService, userId);

    if (existingData.emailVerified) throw utilService.createError(400, "Email already verified");

    existingData.emailVerified = true;

    await existingData.save().catch(utilService.throwInternalError());

    // ----- TOKENS -----
    const tokens = jwtService.generateTokens({ uid: existingData.uid });

    try {
      await tokernRepository.add(existingData.uid, tokens.refreshToken);
      await userRepository.update(existingData.uid, { lastLogin: new Date() });
    } catch (error) {
      throw utilService.createError(500, "Faild to login, Error updating login status");
    }

    await emailService.sendWelcomeEmail(existingData?.email).catch(utilService.throwInternalError());

    return {
      ...tokens,
      email: existingData.email,
      photoURL: existingData.photoURL,
      name: existingData.name,
      uid: existingData.uid,
    };
  } catch (error) {
    console.log(error);
  }
}
