import authServiceImpl from "../../frameworks/services/authServices";

const authServiceInterface = (
  authService: ReturnType<typeof authServiceImpl>
) => {
  const verifyIdToken = (token: string) => authService.verifyIdToken(token);

  const createOtp = (uid: string, reason: string) =>
    authService.createOtp(uid, reason);

  const tokensForUser = (uid: string) => authService.tokensForUser(uid);

  const getAccessTokenPayload = (token: string) =>
    authService.getAccessTokenPayload(token);

  const getRefreshTokenPayload = (token: string) =>
    authService.getRefreshTokenPayload(token);

  const createAccessToken = (payload: { uid?: string; email?: string }) =>
    authService.createAccessToken(payload);

  return {
    verifyIdToken,
    createOtp,
    tokensForUser,
    getAccessTokenPayload,
    getRefreshTokenPayload,
    createAccessToken,
  };
};

export default authServiceInterface;
