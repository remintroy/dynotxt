import validatorInteraface from "../application/services/validatorInteraface";
import validatorImpl from "../frameworks/services/validator/validatorImpl";
import createNormalUser from "./user.normal";
import { utilService } from "../application/services/commonServices";

const { createError } = utilService;
const validator = validatorInteraface(validatorImpl());

export const userEntity = createNormalUser({
  validator,
  createError,
});

export default {
  userEntity,
};
