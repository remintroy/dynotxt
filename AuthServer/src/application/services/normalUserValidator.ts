import { INormalUserValidator } from "../../frameworks/services/validator";

export default function normalUserValidator(validator: INormalUserValidator) {
  const isValidExisingUid = (uid: string) => validator.isValidExisingUid(uid);
  const isValidNewUid = (uid: string) => validator.isValidNewUid(uid);
  const isValidUid = (uid: string) => validator.isValidUid(uid);
  const isValidName = (name: string) => validator.isValidName(name);
  const isValidEmail = (email: string) => validator.isValidEmail(email);
  const isValidPhone = (phone: string) => validator.isValidPhone(phone);
  const isValidUrl = (url: string) => validator.isValidUrl(url);
  const isValidBoolean = (bool: boolean) => validator.isValidBoolean(bool);
  const isValidReferCode = (referCode: string) => validator.isValidReferCode(referCode);
  const isValidGender = (gender: string) => validator.isValidGender(gender);
  const isValidDate = (date: Date) => validator.isValidDate(date);
  const isValidJwt = (jwt: string) => validator.isValidJwt(jwt);
  const isValidHash = (hash: string) => validator.isValidHash(hash);
  const isValidProvider = (provider: string) => validator.isValidProvider(provider);

  return {
    isValidExisingUid,
    isValidNewUid,
    isValidUid,
    isValidName,
    isValidEmail,
    isValidPhone,
    isValidUrl,
    isValidBoolean,
    isValidReferCode,
    isValidGender,
    isValidDate,
    isValidJwt,
    isValidHash,
    isValidProvider,
  };
}
