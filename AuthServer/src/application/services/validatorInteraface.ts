import validatorImpl from "../../frameworks/services/validator/validatorImpl";

const validatorInteraface = (validator: ReturnType<typeof validatorImpl>) => {
  const isValidExisingUid = validator.isValidExisingUid;
  const isValidNewUid = validator.isValidNewUid;
  const isValidUid = validator.isValidUid;
  const isValidName = validator.isValidName;
  const isValidEmail = validator.isValidEmail;
  const isValidPhone = validator.isValidPhone;
  const isValidUrl = validator.isValidUrl;
  const isValidBoolean = validator.isValidBoolean;
  const isValidReferCode = validator.isValidReferCode;
  const isValidGender = validator.isValidGender;
  const isValidDate = validator.isValidDate;
  const isValidJwt = validator.isValidJwt;
  const isValidHash = validator.isValidHash;
  const isValidPassword = validator.isValidPassword;
  const isValidProvider = validator.isValidProvider;

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

type validatorInteraface = ReturnType<typeof validatorInteraface>;
export default validatorInteraface;
