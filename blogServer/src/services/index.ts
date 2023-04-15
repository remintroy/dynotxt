import services, { getEmail, getUtils } from "dynotxt-common-services";
import { appConfig } from "../configs";

const config = appConfig(); 

export const utils = getUtils();
export const email = getEmail(config.email.user, config.email.pass);

export default services;
