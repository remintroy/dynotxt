import createNormalUserValidator from "./user";

export const normalUserValidatorImpl = new createNormalUserValidator();
export type INormalUserValidator = typeof normalUserValidatorImpl;
