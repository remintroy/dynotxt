import {
  adminJwtServiceImpl,
  emailServiceImpl,
  userJwtServiceImpl,
  utilServiceImpl,
} from "../../frameworks/services/commonServices";

export const adminJwtService = adminJwtServiceImpl;
export const userJwtService = userJwtServiceImpl;
export const emailService = emailServiceImpl;
export const utilService = utilServiceImpl;
