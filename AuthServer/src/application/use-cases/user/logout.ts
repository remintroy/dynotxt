import tokenRepositoryInteraface from "../../repository/tokensRepositoryInteraface";

export default async function userLogout(
  tokernRepository: ReturnType<typeof tokenRepositoryInteraface>,
  createError,
  refreshToken: string,
  userId: string
) {
    
}
