import emailObj from "./email";
import utils from "./utils";
import jwt from "./jwt";

export default {
  getEmail: emailObj,
  getUtils: utils,
  getJwt: jwt,
};

export const getEmail = emailObj;
export const getUtils = utils;
export const getJwt = jwt;
