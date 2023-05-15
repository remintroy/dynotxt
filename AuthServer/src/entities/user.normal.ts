/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import validatorInteraface from "../application/services/validatorInteraface";

export interface IUser {
  uid?: string;
  bio?: string;
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
  dob?: Date | string;
  createdAt?: Date | string;
  lastLogin?: Date | string;
  lastRefresh?: Date | string;
  disabled?: boolean;
  phoneVerified?: boolean;
  emailVerified?: boolean;
  hash?: string;
  following?: number;
  followers?: number;
}

function createNormalUser({
  validator,
  createError,
}: {
  validator: ReturnType<typeof validatorInteraface>;
  createError: any;
}) {
  // Check class fucntionally
  return async (data: IUser) => {
    try {
      const userValidatedData = await Promise.all([
        validator.isValidUid(data.uid),
        validator.isValidName(data.name),
        validator.isValidEmail(data.email),
        validator.isValidPhone(data.phone),
        validator.isValidUrl(data.photoURL),
        validator.isValidBoolean(data.privateAccount),
        validator.isValidReferCode(data.referal),
        validator.isValidReferCode(data.referedBy),
        validator.isValidGender(data.gender),
        validator.isValidDate(data.dob),
        validator.isValidDate(data.createdAt),
        validator.isValidDate(data.lastLogin),
        validator.isValidDate(data.lastRefresh),
        validator.isValidBoolean(data.disabled),
        validator.isValidBoolean(data.phoneVerified),
        validator.isValidBoolean(data.emailVerified),
        validator.isValidHash(data.hash),
        validator.isValidProvider(data.provider),
      ]);
      data.uid = userValidatedData[0];
      data.name = userValidatedData[1];
      data.email = userValidatedData[2];
      data.phone = userValidatedData[3];
      data.photoURL = userValidatedData[4];
      data.privateAccount = userValidatedData[5];
      data.referal = userValidatedData[6];
      data.referedBy = userValidatedData[7];
      data.gender = userValidatedData[8];
      data.dob = userValidatedData[9];
      data.createdAt = userValidatedData[10];
      data.lastLogin = userValidatedData[11];
      data.lastRefresh = userValidatedData[12];
      data.disabled = userValidatedData[13];
      data.phoneVerified = userValidatedData[14];
      data.emailVerified = userValidatedData[15];
      data.hash = userValidatedData[16];
      data.provider = userValidatedData[17];
      data.bio = data.bio;

      const makePublicAccount = () => {
        this.privateAccount = false;
      };
      const makePrivateAccount = () => {
        this.privateAccount = true;
      };
      const makePhoneUnverified = () => {
        this.phoneVerified = false;
      };
      const makePhoneVerified = () => {
        this.phoneVerified = true;
      };
      const makeEmailUnverified = () => {
        this.emailVerified = false;
      };
      const makeEmailVerified = () => {
        this.emailVerified = true;
      };
      const updateName = async (userName: string) => {
        this.name = await validator.isValidName(userName);
      };
      const updateEmail = async (userEmail: string) => {
        this.email = await validator.isValidEmail(userEmail);
      };
      const updatePhone = async (userPhone: string) => {
        this.phone = await validator.isValidPhone(userPhone);
      };
      const updateGender = async (gender: string) => {
        this.gender = await validator.isValidGender(gender);
      };
      const updateDob = async (dob: Date) => {
        this.dob = await validator.isValidDate(dob);
      };
      const updateHash = async (hash: string) => {
        this.hash = await validator.isValidHash(hash);
      };
      const updateCreateAt = async (createAt: Date) => {
        this.createdAt = await validator.isValidDate(createAt);
      };
      const updatePhotoURL = async (userPhotoURL: string) => {
        this.photoURL = await validator.isValidUrl(userPhotoURL);
      };
      const updateReferal = async (referal: string) => {
        this.referal = await validator.isValidReferCode(referal);
      };
      const updateReferedBy = async (referal: string) => {
        this.referedBy = await validator.isValidReferCode(referal);
      };
      const updateLastLogin = async (lastLogin: Date) => {
        this.lastLogin = await validator.isValidDate(lastLogin);
      };
      const updateLastRefresh = async (lastRefresh: Date) => {
        this.lastRefresh = await validator.isValidDate(lastRefresh);
      };
      const getSafeData = (): IUser => {
        const userData = data;
        return Object.keys(userData).reduce((acc, key) => {
          if (userData[key]) acc = { ...acc, [key]: userData[key] };
          return acc;
        }, {});
      };

      return {
        getData: () => data,
        getSafeData: () => getSafeData(),
        getEmail: () => data.email,
        getPhone: () => data.phone,
        makePublicAccount,
        makePrivateAccount,
        makePhoneUnverified,
        makePhoneVerified,
        makeEmailUnverified,
        makeEmailVerified,
        updateName,
        updateEmail,
        updatePhone,
        updatePhotoURL,
        updateReferal,
        updateReferedBy,
        updateGender,
        updateDob,
        updateCreateAt,
        updateLastLogin,
        updateLastRefresh,
        updateHash,
      };
    } catch (error) {
      throw createError(400, error);
    }
  };
}

export default createNormalUser;
