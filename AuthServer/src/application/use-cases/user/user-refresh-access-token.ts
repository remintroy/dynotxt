import GetUtils from "dynotxt-common-services/build/utils";
import tokenRepositoryInteraface from "../../repository/tokensRepositoryInteraface";
import userRepositoryInteraface from "../../repository/userRepositoryInteraface";
import GetJwt from "dynotxt-common-services/build/jwt";
import caseUserAccessCheck from "./user-access-checks";

export default async function refreshUser(
  tokensRepository: tokenRepositoryInteraface,
  userRepository: userRepositoryInteraface,
  utilsService: GetUtils,
  jwtService: GetJwt,
  refreshToken: string
) {
  if (!refreshToken) throw utilsService.createError(400, "Refresh token is required");

  const existingToken = await tokensRepository.getByToken(refreshToken).catch(utilsService.throwInternalError());

  if (!existingToken) throw utilsService.createError(401, "Invalid refresh token");

  const payload = jwtService.verifyRefreshToken(refreshToken);

  const user = await caseUserAccessCheck(userRepository, utilsService, payload?.uid);

  const accessToken = jwtService.generateAccessToken({
    uid: payload.uid,
  });

  user.lastRefresh = new Date();
  await user.save().catch(utilsService.throwInternalError());

  return { accessToken };
}
