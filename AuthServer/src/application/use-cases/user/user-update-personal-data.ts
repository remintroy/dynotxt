import GetUtils from "dynotxt-common-services/build/utils";
import { userEntity } from "../../../entities";
import { User } from "../../../entities/user.normal";
import userRepositoryInteraface from "../../repository/userRepositoryInteraface";

export default async function updatePersonalUserData(
  userRepository: ReturnType<typeof userRepositoryInteraface>,
  utilsService: GetUtils,
  dataToUpdate: User,
  userId: string
) {
  const user = await userEntity({
    phone: dataToUpdate?.phone,
    gender: dataToUpdate?.gender,
    dob: dataToUpdate?.dob,
    privateAccount: dataToUpdate?.privateAccount,
  });

  const validUpdatableData = user.getSafeData();

  return await userRepository
    .update(userId, validUpdatableData)
    .catch(utilsService.throwInternalError("Faild to update user data"));
}
