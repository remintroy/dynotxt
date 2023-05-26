import GetUtils from "dynotxt-common-services/build/utils";
import userRepositoryInteraface from "../../repository/userRepositoryInteraface";

const caseAdminDisableUserByUserId = async (
  userRepository: userRepositoryInteraface,
  utilsService: GetUtils,
  userId: string
) => {
  if (!userId) throw utilsService.createError(400, "User id is required");
  return await userRepository.update(userId, { disabled: true }).catch(utilsService.throwInternalError());
};

export default caseAdminDisableUserByUserId;
