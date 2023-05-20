import GetUtils from "dynotxt-common-services/build/utils";
import userRepositoryInteraface from "../../repository/userRepositoryInteraface";

const caseUserAccessCheck = async (
  userRepository: userRepositoryInteraface,
  utilsService: GetUtils,
  userId: string
) => {
  if (!userId) throw utilsService.createError(400, "UserId is required");

  const userData = await userRepository.getById(userId).catch(utilsService.throwInternalError());
  if (!userData) throw utilsService.createError(404, "User not found");
  if (userData?.disabled) throw utilsService.createError(403, "User is not active");

  return userData;
};

type caseUserAccessCheck = typeof caseUserAccessCheck;
export default caseUserAccessCheck;