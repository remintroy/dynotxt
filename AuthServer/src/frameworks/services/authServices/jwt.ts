import { getJwt } from "dynotxt-common-services";
import { getConfigs } from "../../../configs";

const config = getConfigs();
const adminJwt = getJwt({ secret: config.jwt.adminAccessSecret });
const userJwt = getJwt({ secret: config.jwt.userAccessSecret });

export default {
  adminJwt,
  userJwt,
};
