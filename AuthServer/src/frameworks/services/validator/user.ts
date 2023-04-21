import validator from "validator";

export default class createNormalUserValidatorImpl {
  constructor() {
    //! TODO : Add validaton logic
    //
  }

  isValidExisingUid = async (uid: string) => {
    return uid;
  };

  isValidUid = async (uid: string) => {
    return uid;
  };

  isValidNewUid = async (uid: string) => {
    return uid;
  };

  isValidName = async (name: string) => {
    return name;
  };

  isValidEmail = async (email: string) => {
    return email;
  };

  isValidPhone = async (phone: string) => {
    return phone;
  };

  isValidUrl = async (url: string) => {
    return url;
  };

  isValidBoolean = async (bool: boolean) => {
    return bool;
  };

  isValidReferCode = async (referCode: string) => {
    return referCode;
  };

  isValidGender = async (gender: string) => {
    return gender;
  };

  isValidDate = async (date: Date) => {
    return date;
  };

  isValidJwt = async (jwt: string) => {
    if (!validator.isJWT(jwt.trim())) {
      throw "Invalid JWT";
    }
    return jwt.trim();
  };

  isValidHash = async (hash: string) => {
    return hash;
  };

  isValidProvider = async (provider: string) => {
    return provider;
  };
}
