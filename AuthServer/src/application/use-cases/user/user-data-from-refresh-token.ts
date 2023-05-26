import GetUtils from "dynotxt-common-services/build/utils";
import GetJwt from "dynotxt-common-services/build/jwt";
import tokenRepositoryInteraface from "../../repository/tokensRepositoryInteraface";
import userRepositoryInteraface from "../../repository/userRepositoryInteraface";
import caseUserAccessCheck from "./user-access-checks";

export default async function getUserFromRefreshToken(
  userRepository: userRepositoryInteraface,
  tokenRepository: tokenRepositoryInteraface,
  jwtService: GetJwt,
  utilsService: GetUtils,
  refreshToken: string
) {
  if (!refreshToken) throw utilsService.createError(400, "Refresh token is required");

  const tokenFromDb = await tokenRepository.getByToken(refreshToken).catch(utilsService.throwInternalError());
  if (!tokenFromDb) throw utilsService.createError(400, "Refresh token is not valid");

  const { uid } = await jwtService.verifyRefreshToken(refreshToken);
  const existingUserData = await caseUserAccessCheck(userRepository, utilsService, uid).catch(
    utilsService.throwInternalError()
  );

  const accessToken = jwtService.generateAccessToken({ uid: existingUserData.uid });

  return {
    accessToken,
    email: existingUserData.email,
    photoURL: existingUserData.photoURL,
    name: existingUserData.name,
    gender: existingUserData.gender,
    privateAccount: existingUserData.privateAccount,
    uid: existingUserData.uid,
    dob: existingUserData.dob,
    phone: existingUserData.phone,
  };
}
