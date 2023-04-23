import authServiceImpl from "../../frameworks/services/authServices";

const authServiceInterface = (
  authService: ReturnType<typeof authServiceImpl>
) => {
  const verifyIdToken = (token: string) => authService.verifyIdToken(token);

  const createOtp = () => authService.createOtp();

  const tokensForUser = (uid: string) => authService.tokensForUser(uid);

  const getAccessTokenPayload = (token: string) =>
    authService.getAccessTokenPayload(token);

  const getRefreshTokenPayload = (token: string) =>
    authService.getRefreshTokenPayload(token);

  const createAccessToken = (payload: { uid?: string; email?: string }) =>
    authService.createAccessToken(payload);

  const adminTokensForUser = (email: string) =>
    authService.adminTokensForUser(email);

  const adminGetAccessTokenPayload = (token: string) =>
    authService.adminGetAccessTokenPayload(token);

  const adminGetRefreshTokenPayload = (token: string) =>
    authService.adminGetRefreshTokenPayload(token);

  const adminCreateAccessToken = (payload: { uid?: string; email?: string }) =>
    authService.adminCreateAccessToken(payload);

  const createPassordHash = (password: string) =>
    authService.createPassordHash(password);

  const comparePasswordWithHash = (password: string, hash: string) =>
    authService.comparePasswordWithHash(password, hash);

  return {
    verifyIdToken,
    createOtp,
    tokensForUser,
    getAccessTokenPayload,
    getRefreshTokenPayload,
    createAccessToken,
    createPassordHash,
    comparePasswordWithHash,
    adminTokensForUser,
    adminGetAccessTokenPayload,
    adminGetRefreshTokenPayload,
    adminCreateAccessToken,
  };
};

export default authServiceInterface;
