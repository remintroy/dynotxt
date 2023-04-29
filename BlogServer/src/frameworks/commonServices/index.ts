import UtilService from "dynotxt-common-services/utils";
import EmailService from "dynotxt-common-services/email";
import JwtService from "dynotxt-common-services/jwt";
import getConfigs from "../../configs";

const config = getConfigs();

export const adminJwtServiceImpl = new JwtService({
  accessSecret: config.jwt.admin,
});
export const userJwtServiceImpl = new JwtService({
  accessSecret: config.jwt.user,
});
export const emailServiceImpl = new EmailService(
  config.email.user,
  config.email.pass
);
export const utilServiceImpl = new UtilService();
