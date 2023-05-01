import userRepositoryInteraface from "../../repository/userRepositoryInteraface";

const getAllUserforAdmin = async (
  userRepository: ReturnType<typeof userRepositoryInteraface>,
  createError,
  pageNo
) => {
  //
  try {
    return await userRepository.getByPageNo(pageNo ?? 1);
  } catch (error) {
    throw createError(500, "Faild to fetch user data");
  }
};

export default getAllUserforAdmin;
