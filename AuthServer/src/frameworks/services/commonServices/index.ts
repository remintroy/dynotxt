import UtilService from "dynotxt-common-services/utils";
import EmailService from "dynotxt-common-services/email";
import JwtService from "dynotxt-common-services/jwt";
import getConfigs from "../../../configs";

const config = getConfigs();

export const adminJwtServiceImpl = new JwtService({
  accessSecret: config.jwt.admin.accessSecret,
  refreshSecret: config.jwt.admin.refreshSecret,
  accessOptions: config.jwt.admin.accessOptions,
  refreshOptions: config.jwt.admin.refreshOptions,
});
export const userJwtServiceImpl = new JwtService({
  accessSecret: config.jwt.user.accessSecret,
  refreshSecret: config.jwt.user.refreshSecret,
  accessOptions: config.jwt.user.accessOptions,
  refreshOptions: config.jwt.user.refreshOptions,
});
export const emailServiceImpl = new EmailService(
  config.email.user,
  config.email.pass
);
export const utilServiceImpl = new UtilService();
