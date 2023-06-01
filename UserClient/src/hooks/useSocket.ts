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

      /** Initial adding or notifications from server */
      server.emit("notification:get_all", (notifications: any) => {
        dispatch(setNotifications(notifications));
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
