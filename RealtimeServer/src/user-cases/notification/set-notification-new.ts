import GetUtils from "dynotxt-common-services/build/utils";
import notificationRepositoryInterface from "../../adaptors/repositorys/notificationRepositoryInterface";
import { notificationContent } from "../../frameworks/mongodb/models/notifications.schema";

const caseSetNewNotification = async (
  notificationRepository: notificationRepositoryInterface,
  utilsService: GetUtils,
  userId: string,
  notificationData: notificationContent
) => {
  if (!userId) throw utilsService.createError(400, "UserId is required");
  if (!notificationData) throw utilsService.createError(400, "NotificationData is required");
  return await notificationRepository
    .addNotification(userId, notificationData)
    .catch(utilsService.throwInternalError());
};

export default caseSetNewNotification;
