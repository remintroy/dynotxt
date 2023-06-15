import GetJwt from "dynotxt-common-services/build/jwt";
import getConfigs from "../../configs";
import { Server, Socket } from "socket.io";
import notificationController from "../../adaptors/controllers/notificationsController";
import notificationRepositoryInterface from "../../adaptors/repositorys/notificationRepositoryInterface";
import notificationRepositoryImpl from "../mongodb/repositorys/notificationRepositoryImpl";
import GetUtils from "dynotxt-common-services/build/utils";
import EventEmitter from "events";

const config = getConfigs();
const jwtService = new GetJwt({
  accessTokenSecret: config.jwt.user,
});

const utilsService = new GetUtils();
const notificationRepository = notificationRepositoryInterface(notificationRepositoryImpl());
const controller = notificationController(notificationRepository, utilsService);
const connectedUsers: Map<string, [Socket]> = new Map();

/**
 * Handles notifications related logic
 * @param io Socket server instance
 * @param socket Socket instance
 */
const ioNotificationsHandler = (io: Server, socket: Socket, events: EventEmitter) => {
  socket.on("notification:get_all", async (callBack) => {
    try {
      const notifications = await controller.getAllNotification(socket);
      callBack(notifications);
    } catch (error) {
      console.log(error);
    }
  });

  /**
   * Event handler for notifications
   */
  events.on("new_notification", (userId, dataToSend) => {
    const socketOfUser = connectedUsers.get(userId);
    if (socketOfUser) {
      socketOfUser?.map((e) => {
        e.emit("notification:set_new", dataToSend);
      });
    }
  });
};

/**
 * Handles connection and initial logics
 * @param io Server instance of socket
 */
const socketSetup = (io: Server, events: EventEmitter) => {
  // middleware to initialize jwt authentication
  io.use((socket, next) => {
    try {
      socket.handshake.auth.user = null;
      const accessToken = socket.handshake.auth?.accessToken;
      if (!accessToken) throw "";
      const user = jwtService.verifyAccessToken(accessToken);
      socket.handshake.auth.user = user?.uid;
    } catch (error) {
      socket.handshake.auth.user = null;
    }
    next();
  });

  // connected to socket
  io.on("connection", async (socket) => {
    // adds users to add connectedUsers list
    const userId = socket.handshake.auth?.user;
    if (userId) {
      const existingData = connectedUsers.get(userId);
      if (!existingData) {
        connectedUsers.set(socket.handshake.auth.user, [socket]);
      } else {
        existingData.push(socket);
        connectedUsers.set(userId, existingData);
      }
    }

    // adding each service handler
    ioNotificationsHandler(io, socket, events);

    socket.on("disconnect", () => {
      const userId = socket.handshake.auth?.user;
      const activeSocketsList: any = connectedUsers.get(userId)?.filter((socket_obj) => socket_obj.id !== socket.id);
      connectedUsers.set(userId, activeSocketsList);
    });
  });
};

export default socketSetup;
