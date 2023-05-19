import GetUtils from "dynotxt-common-services/build/utils";
import GetJwt from "dynotxt-common-services/build/jwt";
import adminUserRepositoryInteraface from "../../repository/adminUserRepositoryInteraface";
import tokenRepositoryInteraface from "../../repository/tokensRepositoryInteraface";
import caseAdminCheckAccess from "./admin-check-access";

export default async function caseAdminGetNewAccessTokenFromRefreshToken(
  tokensRepository: tokenRepositoryInteraface,
  adminUserRepository: adminUserRepositoryInteraface,
  jwtService: GetJwt,
  utilService: GetUtils,
  refreshToken: string
) {
  if (!refreshToken) throw utilService.createError(400, "Refresh token is required");

  const refreshTokenFromDataBase = await tokensRepository
    .getByToken(refreshToken)
    .catch(utilService.throwInternalError());

  if (!refreshTokenFromDataBase) throw utilService.createError(401, "Invalid refresh token");

  const refreshTokenPayload = jwtService.verifyRefreshToken(refreshToken);

  const user = await caseAdminCheckAccess(adminUserRepository, utilService, refreshTokenPayload?.email);

  const accessToken = jwtService.generateAccessToken({
    email: refreshTokenPayload?.email,
  });

  // update last login and ignores if any error occurs
  user.lastRefresh = new Date();

  await user.save().catch(utilService.throwInternalError());

  return { accessToken };
}
