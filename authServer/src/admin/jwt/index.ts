import jwt from "jsonwebtoken";
import { adminAppConfig } from "../../configs";

const config = adminAppConfig();

// verify access token
export const getAccessTokenData = (accessToken: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(accessToken, config.accessTokenSecret, (err, data) => {
      if (err) reject(err.message);
      else resolve(data);
    });
  });
};

// verify refresh token
export const getRefreshTokenData = (refreshToken: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, config.refreshTokenSecret, (err, data) => {
      if (err) reject(err.message);
      else resolve(data);
    });
  });
};

// creates new refresh token
export const newRefreshToken = (payload: object) => {
  return jwt.sign(payload, config.refreshTokenSecret, {
    expiresIn: config.refreshTokenExpires,
  });
};

// creates new access token
export const newAccessToken = (payload: { uid: string }) => {
  return jwt.sign({ uid: payload.uid }, config.accessTokenSecret, {
    expiresIn: config.accessTokenExires,
  });
};
