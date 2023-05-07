import tokenRepositoryInteraface from "../../repository/tokensRepositoryInteraface";

const logoutAdmin = async (
  tokernRepository: ReturnType<typeof tokenRepositoryInteraface>,
  createError,
  refreshToken: string,
  email: string
) => {
  if (!refreshToken)
    throw createError(400, "You need to login for logging out");
  try {
    await tokernRepository.remove({ uid: email, value: refreshToken });
  } catch (error) {
    throw createError(500, "Error loggging out user", error);
  }
  // set res.cookie('refreshToken', null);
  return null;
};

export default logoutAdmin;
