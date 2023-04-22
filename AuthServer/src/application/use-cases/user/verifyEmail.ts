import getConfigs from "../../../configs";
import { IUser } from "../../../entities/user.normal";
import otpRepositoryInterface from "../../repository/otpRepositoyInteraface";
import tokenRepositoryInteraface from "../../repository/tokensRepositoryInteraface";
import userRepositoryInteraface from "../../repository/userRepositoryInteraface";
import authServiceInterface from "../../services/authServices";

export default async function verifyEmail(
  userRepository: ReturnType<typeof userRepositoryInteraface>,
  otpRepository: ReturnType<typeof otpRepositoryInterface>,
  authService: ReturnType<typeof authServiceInterface>,
  tokernRepository: ReturnType<typeof tokenRepositoryInteraface>,
  createError,
  userId: string,
  otp: string
) {
  const config = getConfigs();
  let existingData: IUser;

  if (!otp) throw createError(400, "OTP is required");
  if (!userId) throw createError(400, "UID is required");
  try {
    const otpData = await otpRepository.getByData({
      otp,
      uid: userId,
      reason: config.actions.VERIFY_EMAIL_AT_SIGNIN,
    });

    if (!otpData) throw createError(400, "Invalid otp");

    existingData = await userRepository.getById(userId);
  } catch (error) {
    throw createError(500, "Failed to fectch nessory data", error);
  }

  if (!existingData) throw createError(400, "User not exist");
  if (existingData.emailVerified)
    throw createError(400, "Email already verified");

  try {
    await userRepository.update(userId, { emailVerified: true });
  } catch (error) {
    throw createError(500, "Failed to fectch nessory data", error);
  }

  // ----- TOKENS -----
  const tokens = authService.tokensForUser(existingData.uid);

  try {
    await tokernRepository.add(existingData.uid, tokens.refreshToken);
    await userRepository.update(existingData.uid, { lastLogin: new Date() });
  } catch (error) {
    throw createError(500, "Faild to login, Error updating login status");
  }

  return {
    ...tokens,
    email: existingData.email,
    photoURL: existingData.photoURL,
    name: existingData.name,
  };
}
