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
    const valid = email ? validator.isEmail(email) : email;
    return valid ? email : null;
  };

  const isValidPhone = async (phone: string) => {
    if (phone) {
      const valid = phone ? validator.isMobilePhone(phone) : phone;
      if (valid) return phone;
      // eslint-disable-next-line no-throw-literal
      throw "Invalid phone";
    }
    return phone;
  };

  const isValidUrl = async (url: string) => {
    const valid = url ? validator.isURL(url) : url;
    return valid ? url : null;
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
    const valid = validator.isDate(date as string);
    return valid ? date : null;
  };

  const isValidJwt = async (jwt: string) => {
    const valid = validator.isJWT(jwt.trim());
    return valid ? jwt.trim() : null;
  };

  const isValidHash = async (hash: string) => {
    return hash;
  };

  const isValidProvider = async (provider: string) => {
    return provider;
  };

  const isValidPassword = async (password: string) => {
    return password;
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
    isValidPassword,
  };
};

type validatorImpl = ReturnType<typeof validatorImpl>;
export default validatorImpl;
