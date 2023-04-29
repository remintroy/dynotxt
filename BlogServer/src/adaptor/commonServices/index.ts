import {
  adminJwtServiceImpl,
  emailServiceImpl,
  userJwtServiceImpl,
  utilServiceImpl,
} from "../../frameworks/commonServices";

export const emailServiceInteraface = (service: typeof emailServiceImpl) =>
  service;
export const userJwtServiceInteraface = (service: typeof userJwtServiceImpl) =>
  service;
export const adminJwtServiceInteraface = (
  service: typeof adminJwtServiceImpl
) => service;
export const utilServiceInteraface = (service: typeof utilServiceImpl) =>
  service;

export default {
  emailServiceInteraface,
  userJwtServiceInteraface,
  adminJwtServiceInteraface,
  utilServiceInteraface,
};
