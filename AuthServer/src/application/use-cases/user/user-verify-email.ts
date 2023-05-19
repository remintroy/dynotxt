import GetUtils from "dynotxt-common-services/build/utils";
import getConfigs from "../../../configs";
import { User } from "../../../entities/user.normal";
import otpRepositoryInterface from "../../repository/otpRepositoyInteraface";
import tokenRepositoryInteraface from "../../repository/tokensRepositoryInteraface";
import userRepositoryInteraface from "../../repository/userRepositoryInteraface";
import authServiceInterface from "../../services/authServices";
import caseUserAccessCheck from "./user-access-checks";
import GetJwt from "dynotxt-common-services/build/jwt";

export default async function verifyEmail(
  userRepository: userRepositoryInteraface,
  otpRepository: otpRepositoryInterface,
  authService: authServiceInterface,
  tokernRepository: tokenRepositoryInteraface,
  jwtService: GetJwt,
  utilService: GetUtils,
  userId: string,
  otp: string
) {
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

  await userRepository.update(userId, { emailVerified: true }).catch(utilService.throwInternalError());

  // ----- TOKENS -----
  const tokens = jwtService.generateTokens(existingData.uid);

  try {
    await tokernRepository.add(existingData.uid, tokens.refreshToken);
    await userRepository.update(existingData.uid, { lastLogin: new Date() });
  } catch (error) {
    throw utilService.createError(500, "Faild to login, Error updating login status");
  }

  return {
    ...tokens,
    email: existingData.email,
    photoURL: existingData.photoURL,
    name: existingData.name,
  };
}
