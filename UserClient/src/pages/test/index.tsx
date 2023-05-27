import io from "socket.io-client";
import { useAppSelector } from "../../lib/redux/hooks";
import { useState } from "react";

const TestPage = () => {
  const user = useAppSelector((state) => state.user.data);
  const [message, setMessage] = useState("");
  if (user) {
    const server = io("server.dynotxt.com", {
      path: "/real/",
      auth: {
        uid: user?.uid,
        accessToken: user?.accessToken,
      },
    });
    server.on("connect", () => {
      server.on("notification:welcome", (payload) => {
       setMessage(payload?.message)
      });

      server.emit("notification:test", { message: "hai" });
    });
  }
  return <div>TestPage : {message}</div>;
};

export default TestPage;
