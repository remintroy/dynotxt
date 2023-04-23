import bcrypt from "bcryptjs";
import * as firebase from "./firebase";
import { adminJwtServiceImpl, userJwtServiceImpl } from "../commonServices";
import getConfigs from "../../../configs";

const authServiceImpl = () => {
  const config = getConfigs();

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

  const createPassordHash = (password: string) => {
    const hash = bcrypt.hash(password, config.bcrypt.salt);
    return hash;
  };

  const comparePasswordWithHash = (password: string, hash: string) => {
    const matched = bcrypt.compare(password, hash);
    return matched;
  };

  const adminTokensForUser = (email: string) => {
    return {
      accessToken: adminJwtServiceImpl.createAccessToken({ email }),
      refreshToken: adminJwtServiceImpl.createRefreshToken({ email }),
    };
  };

  const adminGetRefreshTokenPayload = (token: string) => {
    return adminJwtServiceImpl.verifyRefreshToken(token);
  };

  const adminGetAccessTokenPayload = (token: string) => {
    return adminJwtServiceImpl.verifyAssessToken(token);
  };

  const adminCreateAccessToken = (payload: {
    uid?: string;
    email?: string;
  }) => {
    return adminJwtServiceImpl.createAccessToken(payload);
  };

  return {
    verifyIdToken,
    createOtp,
    tokensForUser,
    getRefreshTokenPayload,
    getAccessTokenPayload,
    createAccessToken,
    createPassordHash,
    comparePasswordWithHash,
    adminTokensForUser,
    adminGetRefreshTokenPayload,
    adminGetAccessTokenPayload,
    adminCreateAccessToken,
  };
};

export default authServiceImpl;
