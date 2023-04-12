import jwt from "jsonwebtoken";
import { appConfig } from "../configs";

const config = appConfig();

// verify access token
export const getAccessTokenData = (accessToken: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(accessToken, config.jwt.accessTokenSecret, (err, data) => {
      if (err) reject(err.message);
      else resolve(data);
    });
  });
};

// verify refresh token
export const getRefreshTokenData = (refreshToken: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, config.jwt.refreshTokenSecret, (err, data) => {
      if (err) reject(err.message);
      else resolve(data);
    });
  });
};

// creates new refresh token
export const newRefreshToken = (payload: object) => {
  return jwt.sign(payload, config.jwt.refreshTokenSecret, {
    expiresIn: config.jwt.refreshTokenExpires,
  });
};

// creates new access token
export const newAccessToken = (payload: { uid: string }) => {
  return jwt.sign({ uid: payload.uid }, config.jwt.accessTokenSecret, {
    expiresIn: config.jwt.accessTokenExires,
  });
};
