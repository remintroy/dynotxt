import tokenRepositoryInteraface from "../../repository/tokensRepositoryInteraface";

export default async function userLogout(
  tokernRepository: ReturnType<typeof tokenRepositoryInteraface>,
  createError,
  refreshToken: string,
  userId: string
) {
  if (!refreshToken)
    throw createError(400, "You need to login for logging out");
  try {
    await tokernRepository.remove({ uid: userId, value: refreshToken });
  } catch (error) {
    throw createError(500, "Error loggging out user", error);
  }
  // set res.cookie('refreshToken', null);
  return null;
}
