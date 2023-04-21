import { getUtils } from "dynotxt-common-services/utils";
import normalUserValidator from "../application/services/normalUserValidator";

const { createError: createErrorType } = getUtils();

export interface IUser {
  uid: string;
  name?: string;
  email?: string;
  phone?: string;
  provider?: string;
  photoURL?: string;
  privateAccount?: boolean;
  img?: string;
  referal?: string;
  referedBy?: string;
  gender?: string;
  dob?: Date;
  createdAt?: Date;
  lastLogin?: Date;
  lastRefresh?: Date;
  disabled?: boolean;
  phoneVerified?: boolean;
  emailVerified?: boolean;
  hash?: string;
}

export default function createNormalUser({
  normalUserValidator,
  createError,
}: {
  normalUserValidator: normalUserValidator;
  createError: typeof createErrorType;
}) {
  // Check class fucntionally
  return class normalUser {
    uid: string;
    name?: string;
    email?: string;
    phone?: string;
    provider?: string;
    photoURL?: string;
    privateAccount?: boolean;
    img?: string;
    referal?: string;
    referedBy?: string;
    gender?: string;
    dob?: Date;
    createdAt?: Date;
    lastLogin?: Date;
    lastRefresh?: Date;
    disabled?: boolean;
    phoneVerified?: boolean;
    emailVerified?: boolean;
    hash?: string;

    constructor({
      uid,
      name,
      email,
      provider,
      createdAt,
      lastLogin,
      lastRefresh,
      photoURL,
      phone,
      disabled,
      hash,
      emailVerified,
      phoneVerified,
      privateAccount,
      referal,
      referedBy,
      gender,
      dob,
    }: IUser) {
      Promise.all([
        normalUserValidator.isValidUid(uid),
        normalUserValidator.isValidName(name),
        normalUserValidator.isValidEmail(email),
        normalUserValidator.isValidPhone(phone),
        normalUserValidator.isValidUrl(photoURL),
        normalUserValidator.isValidBoolean(privateAccount),
        normalUserValidator.isValidReferCode(referal),
        normalUserValidator.isValidReferCode(referedBy),
        normalUserValidator.isValidGender(gender),
        normalUserValidator.isValidDate(dob),
        normalUserValidator.isValidDate(createdAt),
        normalUserValidator.isValidDate(lastLogin),
        normalUserValidator.isValidDate(lastRefresh),
        normalUserValidator.isValidBoolean(disabled),
        normalUserValidator.isValidBoolean(phoneVerified),
        normalUserValidator.isValidBoolean(emailVerified),
        normalUserValidator.isValidHash(hash),
        normalUserValidator.isValidProvider(provider),
      ]).then((userValidatedData) => {
        // assigning validated values to user object
        try {
          this.uid = userValidatedData[0];
          this.name = userValidatedData[1];
          this.email = userValidatedData[2];
          this.phone = userValidatedData[3];
          this.photoURL = userValidatedData[4];
          this.privateAccount = userValidatedData[5];
          this.referal = userValidatedData[6];
          this.referedBy = userValidatedData[7];
          this.gender = userValidatedData[8];
          this.dob = userValidatedData[9];
          this.createdAt = userValidatedData[10];
          this.lastLogin = userValidatedData[11];
          this.lastRefresh = userValidatedData[12];
          this.disabled = userValidatedData[13];
          this.phoneVerified = userValidatedData[14];
          this.emailVerified = userValidatedData[15];
          this.hash = userValidatedData[16];
          this.provider = userValidatedData[17];
        } catch (error) {
          throw createError(400, error);
        }
      });
    }

    getEmail = () => this.email;
    getPhone = () => this.phone;

    makePublicAccount = () => (this.privateAccount = false);
    makePrivateAccount = () => (this.privateAccount = true);
    makePhoneUnverified = () => (this.phoneVerified = false);
    makePhoneVerified = () => (this.phoneVerified = true);
    makeEmailUnverified = () => (this.emailVerified = false);
    makeEmailVerified = () => (this.emailVerified = true);
    updateName = async (userName: string) => (this.name = await normalUserValidator.isValidName(userName));
    updateEmail = async (userEmail: string) => (this.email = await normalUserValidator.isValidEmail(userEmail));
    updatePhone = async (userPhone: string) => (this.phone = await normalUserValidator.isValidPhone(userPhone));
    updateGender = async (gender: string) => (this.gender = await normalUserValidator.isValidGender(gender));
    updateDob = async (dob: Date) => (this.dob = await normalUserValidator.isValidDate(dob));
    updateHash = async (hash: string) => (this.hash = await normalUserValidator.isValidHash(hash));
    updateCreateAt = async (createAt: Date) => (this.createdAt = await normalUserValidator.isValidDate(createAt));
    updatePhotoURL = async (userPhotoURL: string) => (this.photoURL = await normalUserValidator.isValidUrl(userPhotoURL));
    updateReferal = async (referal: string) => (this.referal = await normalUserValidator.isValidReferCode(referal));
    updateReferedBy = async (referal: string) => (this.referedBy = await normalUserValidator.isValidReferCode(referal));
    updateLastLogin = async (lastLogin: Date) => (this.lastLogin = await normalUserValidator.isValidDate(lastLogin));
    updateLastRefresh = async (lastRefresh: Date) => (this.lastRefresh = await normalUserValidator.isValidDate(lastRefresh));

    getData = () => {
      return {
        uid: this.uid,
        name: this.name,
        email: this.email,
        phone: this.phone,
        photoURL: this.photoURL,
        privateAccount: this.privateAccount,
        referal: this.referal,
        referedBy: this.referedBy,
        gender: this.gender,
        dob: this.dob,
        createdAt: this.createdAt,
        lastLogin: this.lastLogin,
        lastRefresh: this.lastRefresh,
        disabled: this.disabled,
        phoneVerified: this.phoneVerified,
        emailVerified: this.emailVerified,
        hash: this.hash,
      };
    };

    getSafeData = () => {
      const userData = this.getData();
      return Object.keys(userData).reduce((acc, key) => {
        userData[key] ? (acc = { ...acc, [key]: userData[key] }) : null;
        return acc;
      }, {});
    };
  };
}

// export default function createNormalUser({
//   normalUserValidator,
//   createError,
// }: {
//   normalUserValidator: normalUserValidator;
//   createError: typeof createErrorType;
// }) {
//   return async (userData: IUser) => {
//     // Validation functions
//     const userValidatedData = await Promise.all([
//       normalUserValidator.isValidUid(userData.uid),
//       normalUserValidator.isValidName(userData.name),
//       normalUserValidator.isValidEmail(userData.email),
//       normalUserValidator.isValidPhone(userData.phone),
//       normalUserValidator.isValidUrl(userData.photoURL),
//       normalUserValidator.isValidBoolean(userData.privateAccount),
//       normalUserValidator.isValidReferCode(userData.referal),
//       normalUserValidator.isValidReferCode(userData.referedBy),
//       normalUserValidator.isValidGender(userData.gender),
//       normalUserValidator.isValidDate(userData.dob),
//       normalUserValidator.isValidDate(userData.createdAt),
//       normalUserValidator.isValidDate(userData.lastLogin),
//       normalUserValidator.isValidDate(userData.lastRefresh),
//       normalUserValidator.isValidBoolean(userData.disabled),
//       normalUserValidator.isValidBoolean(userData.phoneVerified),
//       normalUserValidator.isValidBoolean(userData.emailVerified),
//       normalUserValidator.isValidHash(userData.hash),
//     ]);

//     // assigning validated values to user object
//     try {
//       userData.uid = userValidatedData[0];
//       userData.name = userValidatedData[1];
//       userData.email = userValidatedData[2];
//       userData.phone = userValidatedData[3];
//       userData.photoURL = userValidatedData[4];
//       userData.privateAccount = userValidatedData[5];
//       userData.referal = userValidatedData[6];
//       userData.referedBy = userValidatedData[7];
//       userData.gender = userValidatedData[8];
//       userData.dob = userValidatedData[9];
//       userData.createdAt = userValidatedData[10];
//       userData.lastLogin = userValidatedData[11];
//       userData.lastRefresh = userValidatedData[12];
//       userData.disabled = userValidatedData[13];
//       userData.phoneVerified = userValidatedData[14];
//       userData.emailVerified = userValidatedData[15];
//       userData.hash = userValidatedData[16];
//     } catch (error) {
//       throw createError(400, error);
//     }
//     const makePublicAccount = () => (userData.privateAccount = false);
//     const makePrivateAccount = () => (userData.privateAccount = true);
//     const makePhoneUnverified = () => (userData.phoneVerified = false);
//     const makePhoneVerified = () => (userData.phoneVerified = true);
//     const makeEmailUnverified = () => (userData.emailVerified = false);
//     const makeEmailVerified = () => (userData.emailVerified = true);

//     try {
//       const updateName = async (userName: string) => (userData.name = await normalUserValidator.isValidName(userName));
//       const updateEmail = async (userEmail: string) => (userData.email = await normalUserValidator.isValidEmail(userEmail));
//       const updatePhone = async (userPhone: string) => (userData.phone = await normalUserValidator.isValidPhone(userPhone));
//       const updateGender = async (gender: string) => (userData.gender = await normalUserValidator.isValidGender(gender));
//       const updateDob = async (dob: Date) => (userData.dob = await normalUserValidator.isValidDate(dob));
//       const updateHash = async (hash: string) => (userData.hash = await normalUserValidator.isValidHash(hash));

//       const updateCreateAt = async (createAt: Date) =>
//         (userData.createdAt = await normalUserValidator.isValidDate(createAt));
//       const updatePhotoURL = async (userPhotoURL: string) =>
//         (userData.photoURL = await normalUserValidator.isValidUrl(userPhotoURL));
//       const updateReferal = async (referal: string) =>
//         (userData.referal = await normalUserValidator.isValidReferCode(referal));
//       const updateReferedBy = async (referal: string) =>
//         (userData.referedBy = await normalUserValidator.isValidReferCode(referal));
//       const updateLastLogin = async (lastLogin: Date) =>
//         (userData.lastLogin = await normalUserValidator.isValidDate(lastLogin));
//       const updateLastRefresh = async (lastRefresh: Date) =>
//         (userData.lastRefresh = await normalUserValidator.isValidDate(lastRefresh));

//       const getSafeData = () => {
//         return Object.keys(userData).reduce((acc, key) => {
//           userData[key] ? (acc = { ...acc, [key]: userData[key] }) : null;
//           return acc;
//         }, {});
//       };

//       return {
//         getData: () => userData,
//         getSafeData: () => getSafeData(),
//         getEmail: () => userData.email,
//         getPhone: () => userData.phone,
//         makePublicAccount,
//         makePrivateAccount,
//         makePhoneUnverified,
//         makePhoneVerified,
//         makeEmailUnverified,
//         makeEmailVerified,
//         updateName,
//         updateEmail,
//         updatePhone,
//         updatePhotoURL,
//         updateReferal,
//         updateReferedBy,
//         updateGender,
//         updateDob,
//         updateCreateAt,
//         updateLastLogin,
//         updateLastRefresh,
//         updateHash,
//       };
//     } catch (error) {
//       throw createError(400, error);
//     }
//   };
// }
