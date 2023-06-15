import { Socket } from "socket.io";
import GetUtils from "dynotxt-common-services/build/utils";
import { notificationContent } from "../../frameworks/mongodb/models/notifications.schema";
import notificationRepositoryInterface from "../repositorys/notificationRepositoryInterface";
import caseUserGetAllNotifications from "../../user-cases/notification/get-notification-all";
import caseSetNewNotification from "../../user-cases/notification/set-notification-new";

const notificationController = (notificationRepository: notificationRepositoryInterface, utilsService: GetUtils) => {
  const getAllNotification = async (socket: Socket) => {
    const userId = socket.handshake.auth.user;
    return await caseUserGetAllNotifications(notificationRepository, utilsService, userId);
  };

  const addNewNotification = async (userId: string, notificationData: notificationContent) => {
    const response = await caseSetNewNotification(notificationRepository, utilsService, userId, notificationData);
    return response;
  };

  return {
    getAllNotification,
    addNewNotification,
  };
};

export default notificationController;
