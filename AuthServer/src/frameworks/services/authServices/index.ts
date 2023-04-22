import * as firebase from "./firebase";
import { userJwtServiceImpl } from "../commonServices";

const authServiceImpl = () => {
  const verifyIdToken = (idToken: string) => firebase.verifyIdToken(idToken);

  const createOtp = async () => "67F24G";

  const tokensForUser = (uid: string) => {
    return {
      accessToken: userJwtServiceImpl.createAccessToken({ uid }),
      refreshToken: userJwtServiceImpl.createRefreshToken({ uid }),
    };
  };

  const getRefreshTokenPayload = (token: string) => {
    return userJwtServiceImpl.verifyRefreshToken(token);
  };

  const getAccessTokenPayload = (token: string) => {
    return userJwtServiceImpl.verifyAssessToken(token);
  };

  const createAccessToken = (payload: { uid?: string; email?: string }) => {
    return userJwtServiceImpl.createAccessToken(payload);
  };

  return {
    verifyIdToken,
    createOtp,
    tokensForUser,
    getRefreshTokenPayload,
    getAccessTokenPayload,
    createAccessToken,
  };
};

export default authServiceImpl;
