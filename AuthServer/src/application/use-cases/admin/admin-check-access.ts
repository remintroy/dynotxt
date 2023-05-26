import GetUtils from "dynotxt-common-services/build/utils";
import adminUserRepositoryInteraface from "../../repository/adminUserRepositoryInteraface";

const caseAdminCheckAccess = async (
  adminUserRepository: adminUserRepositoryInteraface,
  utilsService: GetUtils,
  email: string
) => {
  const user = await adminUserRepository.getByEmail(email).catch(utilsService.throwInternalError());

  if (!user) throw utilsService.createError(400, "User not found");
  if (user.disabled) throw utilsService.createError(403, "Access denied");

  return user;
};

type caseAdminCheckAccess = typeof caseAdminCheckAccess;
export default caseAdminCheckAccess;
