import { Server } from "socket.io";
import ioNotificationsHandler from "./notifications";
import GetJwt from "dynotxt-common-services/build/jwt";
import getConfigs from "../../configs";

const config = getConfigs();
const jwtService = new GetJwt({
  accessTokenSecret: config.jwt.user,
});

const socketSetup = (io: Server) => {
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
    // adding each service handler
    ioNotificationsHandler(io, socket);
  });
};

export default socketSetup;
