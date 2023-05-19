import GetUtils from "dynotxt-common-services/build/utils";
import userRepositoryInteraface from "../../repository/userRepositoryInteraface";

const getAllUserforAdmin = async (
  userRepository: userRepositoryInteraface,
  utilService: GetUtils,
  pageNumber: number
) => {
  //
  return await userRepository.getByPageNo(pageNumber ?? 1).catch(utilService.throwInternalError());
};

export default getAllUserforAdmin;
