import * as firebase from "./firebase";
import jwt from "./jwt";

export default function authServiceImpl() {
  const verifyIdToken = (idToken: string) => firebase.verifyIdToken(idToken);
  const createOtp = async (uid: string, reason: string) => "67F24G";

  const adminJwt = jwt.adminJwt;
  const userJwt = jwt.userJwt;
  const tokensForUser = (uid: string) => {
    return {
      accessToken: jwt.userJwt.createAccessToken({ uid: uid }),
      refreshTOken: jwt.userJwt.createRefreshToken({ uid: uid }),
    };
  };

  return {
    verifyIdToken,
    createOtp,
    adminJwt,
    userJwt,
    tokensForUser,
  };
}
