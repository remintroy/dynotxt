import jwt from "jsonwebtoken";
import createVerifyAccessToken from "./verifyAccessToken";
import createVerifyRefreshToken from "./verifyRefreshToken";
import createCreateAccessToken from "./createAccessToken";
import createCreateRefreshToken from "./createRefreshToken";

export const getJwt = ({ secret, options }: { secret: string; options: { expiresIn: string | number } }) => {
  return {
    verifyAssessToken: createVerifyAccessToken({ jwt, secret }),
    verifyRefreshToken: createVerifyRefreshToken({ jwt, secret }),
    createAccessToken: createCreateAccessToken(jwt, secret, options),
    createRefreshToken: createCreateRefreshToken(jwt, secret, options),
  };
};

export default getJwt;
