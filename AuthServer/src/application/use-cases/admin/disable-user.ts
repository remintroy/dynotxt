import userRepositoryInteraface from "../../repository/userRepositoryInteraface";

const disableUser = async (
  userRepository: ReturnType<typeof userRepositoryInteraface>,
  createError,
  userId
) => {
  if (!userId) throw createError(400, "User id is required");
  try {
    return await userRepository.update(userId, { disabled: true });
  } catch (error) {
    throw createError(500, "Faild to disable user");
  }
};

export default disableUser;
