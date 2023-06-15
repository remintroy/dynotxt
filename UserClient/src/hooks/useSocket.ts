import { io } from "socket.io-client";
import useUserDataHook from "./useUserData";
import { useAppDispatch } from "../lib/redux/hooks";
import { setNotifications } from "../lib/redux/slices/notification";

const useSocketHook = () => {
  const user = useUserDataHook();
  const dispatch = useAppDispatch();

  if (user) {
    const server = io("server.dynotxt.com", {
      path: "/real/",
      auth: {
        uid: user?.uid,
        accessToken: user?.accessToken,
      },
    });

    server.on("connect", () => {
      console.log("Socket connected");

      /**
       * Sends the connection is about to be closed
       */
      window.addEventListener("beforeunload", () => {
        server.emit("disconnecting");
      });

      /** Initial adding or notifications from server */
      server.emit("notification:get_all", (notifications: any) => {
        dispatch(setNotifications(notifications));
      });

      server.on("notification:set_new", (dataToSet) => {
        dispatch(setNotifications(dataToSet));
      });
      //
    });

    /**
     * Notification listeners handler part
     */
    server.on("notification:set_all", (data: any) => {
      console.log(data);
    });

    return server;
  }
};

export default useSocketHook;
