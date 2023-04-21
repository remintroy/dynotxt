import INormalUserValidator from "../../frameworks/services/validator/user";

export default class normalUserValidator {
  private _normalUserValidator: INormalUserValidator;

  constructor(validator: INormalUserValidator) {
    this._normalUserValidator = validator;
  }

  isValidExisingUid = (uid: string) => this._normalUserValidator.isValidExisingUid(uid);
  isValidNewUid = (uid: string) => this._normalUserValidator.isValidNewUid(uid);
  isValidUid = (uid: string) => this._normalUserValidator.isValidUid(uid);
  isValidName = (name: string) => this._normalUserValidator.isValidName(name);
  isValidEmail = (email: string) => this._normalUserValidator.isValidEmail(email);
  isValidPhone = (phone: string) => this._normalUserValidator.isValidPhone(phone);
  isValidUrl = (url: string) => this._normalUserValidator.isValidUrl(url);
  isValidBoolean = (bool: boolean) => this._normalUserValidator.isValidBoolean(bool);
  isValidReferCode = (referCode: string) => this._normalUserValidator.isValidReferCode(referCode);
  isValidGender = (gender: string) => this._normalUserValidator.isValidGender(gender);
  isValidDate = (date: Date) => this._normalUserValidator.isValidDate(date);
  isValidJwt = (jwt: string) => this._normalUserValidator.isValidJwt(jwt);
  isValidHash = (hash: string) => this._normalUserValidator.isValidHash(hash);
  isValidProvider = (provider: string) => this._normalUserValidator.isValidProvider(provider);
}
