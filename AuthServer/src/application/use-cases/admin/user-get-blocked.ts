import GetUtils from "dynotxt-common-services/build/utils";
import userRepositoryInteraface from "../../repository/userRepositoryInteraface";

const getBlockedUsers = (userRepository: userRepositoryInteraface, utilService: GetUtils, pageNumber: number) => {
  return userRepository
    .getByCustomQueryWithPageNo({ disabled: true }, pageNumber ?? 1)
    .catch(utilService.throwInternalError());
};

export default getBlockedUsers;
