import GetUtils from "dynotxt-common-services/build/utils";
import notificationRepositoryInterface from "../repositorys/notificationRepositoryInterface";
import { Socket } from "socket.io";
import caseUserGetAllNotifications from "../../user-cases/notification/get-notification-all";

const notificationController = (notificationRepository: notificationRepositoryInterface, utilsService: GetUtils) => {
  const getAllNotification = async (socket: Socket) => {
    const userId = socket.handshake.auth.user;
    return await caseUserGetAllNotifications(notificationRepository, utilsService, userId);
  };

  return {
    getAllNotification,
  };
};

export default notificationController;
