import { userEntity } from "../../../entities";
import { IUser } from "../../../entities/user.normal";
import userRepositoryInteraface from "../../repository/userRepositoryInteraface";

export default async function updatePublicUserData(
  userRepository: ReturnType<typeof userRepositoryInteraface>,
  createError,
  dataToUpdate: IUser,
  userId: string
) {
  const user = await userEntity({
    name: dataToUpdate?.name,
    photoURL: dataToUpdate?.photoURL, 
  });

  const validUpdatableData = user.getSafeData();
  try {
    return await userRepository.update(userId, validUpdatableData);
  } catch (error) {
    throw createError(500, "Faild to update user data", error);
  }
}
