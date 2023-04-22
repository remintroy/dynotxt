import validator from "validator";

const validatorImpl = () => {
  const isValidExisingUid = async (uid: string) => {
    return uid;
  };

  const isValidUid = async (uid: string) => {
    return uid;
  };

  const isValidNewUid = async (uid: string) => {
    return uid;
  };

  const isValidName = async (name: string) => {
    return name;
  };

  const isValidEmail = async (email: string) => {
    return email;
  };

  const isValidPhone = async (phone: string) => {
    return phone;
  };

  const isValidUrl = async (url: string) => {
    return url;
  };

  const isValidBoolean = async (bool: boolean) => {
    return bool;
  };

  const isValidReferCode = async (referCode: string) => {
    return referCode;
  };

  const isValidGender = async (gender: string) => {
    return gender;
  };

  const isValidDate = async (date: Date | string) => {
    return date;
  };

  const isValidJwt = async (jwt: string) => {
    return !validator.isJWT(jwt.trim());
  };

  const isValidHash = async (hash: string) => {
    return hash;
  };

  const isValidProvider = async (provider: string) => {
    return provider;
  };

  return {
    isValidExisingUid,
    isValidUid,
    isValidNewUid,
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
};

export default validatorImpl;
