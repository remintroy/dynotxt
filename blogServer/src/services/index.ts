import services, { getEmail, getUtils, getJwt } from "dynotxt-common-services";
import { appConfig } from "../configs";

const config = appConfig();

export const utils = getUtils();
export const email = getEmail(config.email.user, config.email.pass);
export const jwt = getJwt({ secret: config.jwt.userSecret });

export default services;
