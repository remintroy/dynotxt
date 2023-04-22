import { IUser } from "../../../entities/user.normal";
import tokenRepositoryInteraface from "../../repository/tokensRepositoryInteraface";
import userRepositoryInteraface from "../../repository/userRepositoryInteraface";
import authServiceInterface from "../../services/authServices";
import validatorInteraface from "../../services/validatorInteraface";

export default async function getUserFromRefreshToken(
  userRepository: ReturnType<typeof userRepositoryInteraface>,
  validator: ReturnType<typeof validatorInteraface>,
  tokenRepository: ReturnType<typeof tokenRepositoryInteraface>,
  authService: ReturnType<typeof authServiceInterface>,
  createError,
  refreshToken
) {
  if (!refreshToken) throw createError(400, "Refresh token is required");
  if (!validator.isValidJwt(refreshToken))
    throw createError(400, "Refresh token is invalid");

  try {
    const tokenFromDb = await tokenRepository.getByToken(refreshToken);
    if (!tokenFromDb) throw createError(400, "Refresh token is not valid");
  } catch (error) {
    throw createError(500, "Faild to fetch nessory data from server", error);
  }

  let existingData: IUser;

  try {
    const { uid } = await authService.getRefreshTokenPayload(refreshToken);
    existingData = await userRepository.getById(uid);
  } catch (error) {
    throw createError(500, "Faild to fetch nessory data from server", error);
  }

  const accessToken = authService.createAccessToken({ uid: existingData.uid });

  return {
    accessToken,
    email: existingData.email,
    photoURL: existingData.photoURL,
    name: existingData.name,
    gender: existingData.gender,
    privateAccount: existingData.privateAccount,
    uid: existingData.uid,
    dob: existingData.dob,
    phone: existingData.phone,
  };
}
