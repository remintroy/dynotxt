import { Server } from "socket.io";
import ioNotificationsHandler from "./notifications";

const socketSetup = (io: Server) => {
  io.on("connection", async (socket) => {
    // adding each service handler
    ioNotificationsHandler(io, socket);
  });
};

export default socketSetup;
