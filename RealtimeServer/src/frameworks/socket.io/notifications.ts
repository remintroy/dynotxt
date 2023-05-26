import { Server, Socket } from "socket.io";

const ioNotificationsHandler = (io: Server, socket: Socket) => {
  socket.emit("notification:welcome", {
    message: "welcome to dynotxt",
  });
};

export default ioNotificationsHandler;
