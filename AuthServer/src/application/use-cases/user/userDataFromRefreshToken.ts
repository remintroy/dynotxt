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

  try {
    const { uid } = await authService.getRefreshTokenPayload(refreshToken);
    const userData = await userRepository.getById(uid);
    return userData;
  } catch (error) {
    throw createError(500, "Faild to fetch nessory data from server", error);
  }
}
