import createNormalUser from "./user.normal";
import { normalUserValidatorImpl } from "../frameworks/services/validator";
import { getUtils } from "dynotxt-common-services";
import User from "./user.normal";

const createError = getUtils().createError;

export const userNormal = createNormalUser({ normalUserValidator: normalUserValidatorImpl, createError });
