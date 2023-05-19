import GetUtils from "dynotxt-common-services/build/utils";
import { User } from "../../../entities/user.normal";

const caseGetFullDetailsOfSingleUser = async (utilsService: GetUtils, userData: User) => {
  if (userData.disabled) throw utilsService.createError(400, "User is disabled");

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
