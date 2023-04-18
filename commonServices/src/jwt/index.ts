import jwt from "jsonwebtoken";
import createVerifyAccessToken from "./verifyAccessToken";
import createVerifyRefreshToken from "./verifyRefreshToken";
import createCreateAccessToken from "./createAccessToken";
import createCreateRefreshToken from "./createRefreshToken";

export const getJwt = ({
  secret,
  accessOptions,
  refreshOptions,
}: {
  secret: string;
  accessOptions?: { expiresIn?: string | number };
  refreshOptions?: { expiresIn?: string | number };
}) => {
  return {
    verifyAssessToken: createVerifyAccessToken({ jwt, secret }),
    verifyRefreshToken: createVerifyRefreshToken({ jwt, secret }),
    createAccessToken: createCreateAccessToken(jwt, secret, accessOptions),
    createRefreshToken: createCreateRefreshToken(jwt, secret, refreshOptions),
  };
};

export default getJwt;
