import GetUtils from "dynotxt-common-services/build/utils";
import adminUserRepositoryInteraface from "../../repository/adminUserRepositoryInteraface";
import tokenRepositoryInteraface from "../../repository/tokensRepositoryInteraface";
import GetJwt from "dynotxt-common-services/build/jwt";
import caseAdminCheckAccess from "./admin-check-access";

export default async function caseAdminGetDataFromRefreshToken(
  adminRepository: adminUserRepositoryInteraface,
  tokenRepository: tokenRepositoryInteraface,
  jwtService: GetJwt,
  utilsService: GetUtils,
  refreshToken: string
) {
  if (!refreshToken) throw utilsService.createError(400, "Refresh token is required");
  const refreshTokenFromDataBase = await tokenRepository
    .getByToken(refreshToken)
    .catch(utilsService.throwInternalError());
  if (!refreshTokenFromDataBase) throw utilsService.createError(401, "Refresh token is not valid");
  const refreshTokenPayload = await jwtService.verifyRefreshToken(refreshToken);
  const adminUserData = await caseAdminCheckAccess(adminRepository, utilsService, refreshTokenPayload?.email);
  const accessToken = jwtService.generateAccessToken({
    email: adminUserData.email,
  });

  return {
    accessToken,
    email: adminUserData.email,
    photoURL: adminUserData.photoURL,
    name: adminUserData.name,
    uid: adminUserData.uid,
    phone: adminUserData.phone,
  };
}
