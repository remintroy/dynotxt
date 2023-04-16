import userModel from "../models/user.model";

export const createUserDb = ({ createError }) => {
  const getUserDataFromUid = async (uid: string) => {
    return await userModel.findOne({ uid: uid }, { _id: 0 });
  };
  return {
    getUserDataFromUid,
  };
};
