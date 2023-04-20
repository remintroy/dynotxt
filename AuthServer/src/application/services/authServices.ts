import authServiceImpl from "../../frameworks/services/authServices";

export default function authService(authService) {
  // const authService = service();
  const verifyIdToken = (token: string) => authService.verifyIdToken(token);
  const createOtp = (uid: string, reason: string) => authService.createOtp(uid, reason);
  const adminJwt = authService.adminJwt;
  const userJwt = authService.userJwt;
  const tokensForUser = (uid: string) => authService.tokensForUser(uid);

  return {
    verifyIdToken,
    createOtp,
    adminJwt,
    userJwt,
    tokensForUser,
  };
}
