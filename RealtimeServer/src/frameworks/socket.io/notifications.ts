import { Server, Socket } from "socket.io";
import notificationController from "../../adaptors/controllers/notificationsController";
import notificationRepositoryInterface from "../../adaptors/repositorys/notificationRepositoryInterface";
import notificationRepositoryImpl from "../mongodb/repositorys/notificationRepositoryImpl";
import GetUtils from "dynotxt-common-services/build/utils";

const utilsService = new GetUtils();
const notificationRepository = notificationRepositoryInterface(notificationRepositoryImpl());
const controller = notificationController(notificationRepository, utilsService);

const ioNotificationsHandler = (io: Server, socket: Socket) => {
  socket.on("notification:get_all", (userId: string) => {
    console.log(userId);
  });
  socket.emit("notification:welcome", {
    message: "welcome to dynotxt",
  });
};

export default ioNotificationsHandler;
