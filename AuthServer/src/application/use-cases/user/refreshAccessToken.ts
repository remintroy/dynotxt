import tokenRepositoryInteraface from "../../repository/tokensRepositoryInteraface";
import userRepositoryInteraface from "../../repository/userRepositoryInteraface";
import authServiceInterface from "../../services/authServices";
import validatorInteraface from "../../services/validatorInteraface";

export default async function refreshUser(
  tokensRepository: ReturnType<typeof tokenRepositoryInteraface>,
  userRepository: ReturnType<typeof userRepositoryInteraface>,
  authServices: ReturnType<typeof authServiceInterface>,
  validator: ReturnType<typeof validatorInteraface>,
  createError,
  refreshToken: string
) {
  if (!refreshToken) throw createError(400, "Refresh token is required");

  await validator.isValidJwt(refreshToken);

  const existingToken = await tokensRepository.getByToken(refreshToken);

  if (!existingToken) throw createError(401, "Invalid refresh token");

  const payload = authServices.getRefreshTokenPayload(refreshToken);

  // if (!payload?.uid) {
  const user = await userRepository.getById(payload?.uid);
  if (!user) throw createError(400, "Invalid users credentials");
  if (user.disabled) throw createError(403, "User disabled");
  // }

  const accessToken = await authServices.createAccessToken({
    uid: payload.uid,
  });

  try {
    await userRepository.update(payload.uid, { lastRefresh: new Date() });
  } catch (error) {
    // Faild case while updating the status
  }

  return accessToken;
}
