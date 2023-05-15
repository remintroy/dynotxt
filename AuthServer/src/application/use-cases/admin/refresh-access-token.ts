import adminUserRepositoryInteraface from "../../repository/adminUserRepositoryInteraface";
import tokenRepositoryInteraface from "../../repository/tokensRepositoryInteraface";
import authServiceInterface from "../../services/authServices";
import validatorInteraface from "../../services/validatorInteraface";

export default async function refreshAdmin(
  tokensRepository: ReturnType<typeof tokenRepositoryInteraface>,
  adminUserRepository: ReturnType<typeof adminUserRepositoryInteraface>,
  authServices: ReturnType<typeof authServiceInterface>,
  validator: ReturnType<typeof validatorInteraface>,
  createError,
  refreshToken: string
) {
  if (!refreshToken) throw createError(400, "Refresh token is required");

  await validator.isValidJwt(refreshToken);

  const existingToken = await tokensRepository.getByToken(refreshToken);

  if (!existingToken) throw createError(401, "Invalid refresh token");

  const payload = authServices.adminGetRefreshTokenPayload(refreshToken);

  const user = await adminUserRepository.getByEmail(payload?.email);
  if (!user) throw createError(400, "Invalid users credentials");
  if (user?.disabled) throw createError(403, "User disabled");

  const accessToken = await authServices.adminCreateAccessToken({
    uid: payload.uid,
  });

  try {
    await adminUserRepository.update(payload.email, { lastRefresh: new Date() });
  } catch (error) {
    // Faild case while updating the status
  }

  return { accessToken };
}
