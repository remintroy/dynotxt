import { IUser } from "../../../entities/user.normal";
import userRepositoryInteraface from "../../repository/userRepositoryInteraface";

const getPublicUser = async (
  userRepository: ReturnType<typeof userRepositoryInteraface>,
  createError,
  userId: string
) => {
  if (!userId)
    throw createError(400, "User id is required to get user information");

  let userData: IUser;

  try {
    userData = await userRepository.getById(userId);
  } catch (error) {
    throw createError(500, "Faild to fetch user information");
  }
  if (!userData) throw createError(400, "User with this not exits");

  const output: IUser = {};

  output.privateAccount = userData.privateAccount;
  output.name = userData.name;
  output.photoURL = userData.photoURL;

  return output;
};

export default getPublicUser;
