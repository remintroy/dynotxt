import GetUtils from "dynotxt-common-services/build/utils";
import notificationRepositoryInterface from "../repositorys/notificationRepositoryInterface";
import { Socket } from "socket.io";

const notificationController = (notificationRepository: notificationRepositoryInterface, utilsService: GetUtils) => {
  const sendNotification = (socket: Socket) => {
    
  };
};

export default notificationController;
