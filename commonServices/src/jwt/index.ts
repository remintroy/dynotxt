import jwt from "jsonwebtoken";
import createVerifyAccessToken from "./verifyAccessToken";

export const getJwt = ({ secret }: { secret: string }) => {
  return {
    verifyAssessToken: createVerifyAccessToken({ jwt, secret }),
  };
};

export default getJwt;
