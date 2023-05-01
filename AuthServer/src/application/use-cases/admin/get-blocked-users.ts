import userRepositoryInteraface from "../../repository/userRepositoryInteraface";

const getBlockedUsers = (
  userRepository: ReturnType<typeof userRepositoryInteraface>,
  createError,
  pageNo
) => {
  try {
    return userRepository.getByCustomQueryWithPageNo(
      { disabled: true },
      pageNo ?? 1
    );
  } catch (error) {
    throw createError(500, "Faild to fetch userData");
  }
};

export default getBlockedUsers;
