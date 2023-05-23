import io from "socket.io-client";

const TestPage = () => {
  const server = io("server.dynotxt.com", {
    path: "/real/",
  });
  server.on("connect", () => {
    server.on("notification:welcome", (payload) => {
      console.log(payload);
    });
    server.emit("notification:test", { message: "hai" });
  });

  return <div>TestPage</div>;
};

export default TestPage;
