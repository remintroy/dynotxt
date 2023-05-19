import GetUtils from "dynotxt-common-services/build/utils";
import validatorInteraface from "../application/services/validatorInteraface";
import validatorImpl from "../frameworks/services/validator/validatorImpl";
import createNormalUser from "./user.normal";

const validator = validatorInteraface(validatorImpl());
const utilsService = new GetUtils();

export const userEntity = createNormalUser({
  validator,
  createError: utilsService.createError,
});

export default {
  userEntity,
};
