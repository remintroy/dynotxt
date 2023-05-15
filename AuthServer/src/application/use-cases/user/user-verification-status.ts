import getConfigs from "../../../configs";
import { IUser } from "../../../entities/user.normal";
import userRepositoryInteraface from "../../repository/userRepositoryInteraface";

export default async function userVerificationStatus(
  userRepository: ReturnType<typeof userRepositoryInteraface>,
  createError:any,
  typeofVerification: string,
  userId: string
) {
  const config = getConfigs();
  let userData: IUser;
  try {
    userData = await userRepository.getById(userId);
  } catch (error) {
    throw createError(500, "Faild to fetch nessory data");
  }
  const response = { status: null };

  switch (typeofVerification) {
    case "email": {
      response.status = userData.emailVerified
        ? config.actions.VERIFIED
        : config.actions.NOT_VERIFIED;
      break;
    }
    case "phone": {
      response.status = userData.phoneVerified
        ? config.actions.VERIFIED
        : config.actions.NOT_VERIFIED;
      break;
    }
    default: {
      throw createError(400, "Invalid Lookup category");
    }
  }
  return response;
}
