import GetUtils from "dynotxt-common-services/build/utils";
import { userEntity } from "../../../entities";
import { User } from "../../../entities/user.normal";
import userRepositoryInteraface from "../../repository/userRepositoryInteraface";

export default async function updatePublicUserData(
  userRepository: ReturnType<typeof userRepositoryInteraface>,
  utilsService: GetUtils,
  dataToUpdate: User,
  userId: string
) {
  const user = await userEntity({
    name: dataToUpdate?.name,
    photoURL: dataToUpdate?.photoURL,
  });

  const validUpdatableData = user.getSafeData();

  return await userRepository
    .update(userId, validUpdatableData)
    .catch(utilsService.throwInternalError("Faild to update user data"));
}
