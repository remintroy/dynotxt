import GetUtils from "dynotxt-common-services/build/utils";
import getConfigs from "../../../configs";
import userRepositoryInteraface from "../../repository/userRepositoryInteraface";
import caseUserAccessCheck from "./user-access-checks";

export default async function userVerificationStatus(
  userRepository: userRepositoryInteraface,
  utislService: GetUtils,
  typeofVerification: string,
  userId: string
) {
  const config = getConfigs();
  const userData = await caseUserAccessCheck(userRepository, utislService, userId);
  const response = { status: null };

  switch (typeofVerification) {
    case "email": {
      response.status = userData.emailVerified ? config.actions.VERIFIED : config.actions.NOT_VERIFIED;
      break;
    }
    case "phone": {
      response.status = userData.phoneVerified ? config.actions.VERIFIED : config.actions.NOT_VERIFIED;
      break;
    }
    default: {
      throw utislService.createError(400, "Invalid Lookup category");
    }
  }
  return response;
}
