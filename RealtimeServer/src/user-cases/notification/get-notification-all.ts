import GetUtils from "dynotxt-common-services/build/utils";
import notificationRepositoryInterface from "../../adaptors/repositorys/notificationRepositoryInterface";

const caseUserGetAllNotifications = async (
  notificationRepository: notificationRepositoryInterface,
  utilsService: GetUtils,
  currentUserId: string
) => {
  if (!currentUserId) throw utilsService.createError(400, "userId is required");
  return await notificationRepository
    .getAllNotification(currentUserId)
    .catch(utilsService.throwInternalError("Someting went wrong while getting notifications"));
};

export default caseUserGetAllNotifications;
