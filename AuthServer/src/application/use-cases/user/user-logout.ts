import GetUtils from "dynotxt-common-services/build/utils";
import tokenRepositoryInteraface from "../../repository/tokensRepositoryInteraface";

export default async function userLogout(
  tokernRepository: ReturnType<typeof tokenRepositoryInteraface>,
  utilsService: GetUtils,
  refreshToken: string,
  userId: string
) {
  if (!refreshToken) throw utilsService.createError(400, "You need to login for logging out");

  await tokernRepository.remove({ uid: userId, value: refreshToken }).catch(utilsService.throwInternalError());

  // set res.cookie('refreshToken', null);
  return null;
}
