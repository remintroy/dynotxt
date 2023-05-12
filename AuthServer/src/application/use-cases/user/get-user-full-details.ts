import { IUser } from "../../../entities/user.normal";

const caseGetFullDetailsOfSingleUser = async (
  createError: any,
  userData: IUser
) => {
  if (userData.disabled) throw createError(400, "User is disabled");

  const output: IUser = {};

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
