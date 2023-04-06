import { adminAppConfig } from "../../../configs";
import { usersModel } from "../../../services/mongoDb";
import { createError } from "../../../utils";

const config = adminAppConfig();

export const disableUserWithUid = async (uid: string) => {
  try {
    try {
      // update status on the database
      const updated = await usersModel.updateOne({ uid }, { $set: { disabled: true } });
      //   checking response from database
      if (updated.matchedCount == 0) throw createError(400, "User not exist with this uid");
      if (updated.modifiedCount == 0) return { message: "User already disabled" };
      return { message: "User disabled successfully" };
    } catch (error) {
      throw createError(500, "Faild to disable user");
    }
  } catch (error) {
    throw error;
  }
};

export const enableUserWithUid = async (uid: string) => {
  try {
    try {
      // update status on the database
      const updated = await usersModel.updateOne({ uid }, { $set: { disabled: false } });
      //   checking response from database
      if (updated.matchedCount == 0) throw createError(400, "User not exist with this uid");
      if (updated.modifiedCount == 0) return { message: "User already enabled" };
      return { message: "User enabled successfully" };
    } catch (error) {
      throw createError(500, "Faild to enable user");
    }
  } catch (error) {
    throw error;
  }
};

export const getUsersDataInPages = async (page: number) => {
  try {
    const options = {
      limit: config.db.paginate.limit,
      page: page || 1,
      projection: config.db.userProjection,
    };
    return usersModel.paginate({}, options);
  } catch (error) {
    throw createError(500, "Faild to get user data");
  }
};
