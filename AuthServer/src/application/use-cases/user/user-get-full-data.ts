import GetUtils from "dynotxt-common-services/build/utils";
import { User } from "../../../entities/user.normal";
import caseUserAccessCheck from "./user-access-checks";
import userRepositoryInteraface from "../../repository/userRepositoryInteraface";

const caseGetFullDetailsOfSingleUser = async (
  userRepository: userRepositoryInteraface,
  utilsService: GetUtils,
  userId: string
) => {
  const userData = await caseUserAccessCheck(userRepository, utilsService, userId);
  const output: User = {};

  output.privateAccount = userData.privateAccount;
  output.name = userData?.name ?? userData.email.split("@")[0];
  output.photoURL = userData.photoURL;
  output.uid = userData.uid;
  output.phone = userData.phone;
  output.gender = userData.gender;
  output.dob = userData.dob;

  return output;
};

export default caseGetFullDetailsOfSingleUser;
