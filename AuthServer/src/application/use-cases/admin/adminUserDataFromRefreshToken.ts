import { IAdminUser } from "../../../frameworks/databases/mongoDb/models/admin.schema";
import adminUserRepositoryInteraface from "../../repository/adminUserRepositoryInteraface";
import tokenRepositoryInteraface from "../../repository/tokensRepositoryInteraface";
import authServiceInterface from "../../services/authServices";
import validatorInteraface from "../../services/validatorInteraface";

export default async function getAdminFromRefreshToken(
  adminRepository: ReturnType<typeof adminUserRepositoryInteraface>,
  validator: ReturnType<typeof validatorInteraface>,
  tokenRepository: ReturnType<typeof tokenRepositoryInteraface>,
  authService: ReturnType<typeof authServiceInterface>,
  createError,
  refreshToken
) {
  if (!refreshToken) throw createError(400, "Refresh token is required");

  // Check with validator
  await validator.isValidJwt(refreshToken);

  try {
    const tokenFromDb = await tokenRepository.getByToken(refreshToken);
    if (!tokenFromDb) throw createError(400, "Refresh token is not valid");
  } catch (error) {
    throw createError(500, "Faild to fetch nessory data from server", error);
  }

  let existingData: IAdminUser;

  try {
    const { email } = await authService.adminGetRefreshTokenPayload(
      refreshToken
    );
    existingData = await adminRepository.getByEmail(email);
  } catch (error) {
    throw createError(500, "Faild to fetch nessory data from server", error);
  }

  const accessToken = authService.adminCreateAccessToken({
    email: existingData.email,
  });

  return {
    accessToken,
    email: existingData.email,
    photoURL: existingData.photoURL,
    name: existingData.name,
    uid: existingData.uid,
    phone: existingData.phone,
  };
}
