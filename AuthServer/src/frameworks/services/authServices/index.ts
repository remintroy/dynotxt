import bcrypt from "bcryptjs";
import * as firebase from "./firebase";
import getConfigs from "../../../configs";

const authServiceImpl = () => {
  const config = getConfigs();

  const verifyIdToken = firebase.verifyIdToken;

  const createOtp = async () => "67F24G";

  const createPassordHash = (password: string) => {
    const hash = bcrypt.hash(password, config.bcrypt.salt);
    return hash;
  };

  const comparePasswordWithHash = (password: string, hash: string) => {
    const matched = bcrypt.compare(password, hash);
    return matched;
  };

  return {
    verifyIdToken,
    createOtp,
    createPassordHash,
    comparePasswordWithHash,
  };
};

type authServiceImpl = ReturnType<typeof authServiceImpl>;
export default authServiceImpl;
