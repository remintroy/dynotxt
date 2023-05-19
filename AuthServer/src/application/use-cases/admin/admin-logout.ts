import GetUtils from "dynotxt-common-services/build/utils";
import tokenRepositoryInteraface from "../../repository/tokensRepositoryInteraface";

const caseAdminLogout = async (
  tokernRepository: tokenRepositoryInteraface,
  utilService: GetUtils,
  refreshToken: string,
  email: string
) => {
  if (!refreshToken) throw utilService.createError(400, "You need to login for logging out");

  await tokernRepository
    .remove({ uid: email, value: refreshToken })
    .catch(utilService.throwInternalError("Error logging out"));

  // set res.cookie('refreshToken', null);
  return null;
};

export default caseAdminLogout;
