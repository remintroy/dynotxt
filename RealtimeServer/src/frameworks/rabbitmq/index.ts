import amqp from "amqplib";
import getConfigs from "../../configs";
import EventEmitter from "events";
import GetUtils from "dynotxt-common-services/build/utils";
import notificationRepositoryInterface from "../../adaptors/repositorys/notificationRepositoryInterface";
import notificationRepositoryImpl from "../mongodb/repositorys/notificationRepositoryImpl";
import notificationController from "../../adaptors/controllers/notificationsController";

const config = getConfigs();
const utilsService = new GetUtils();
const notificationRepository = notificationRepositoryInterface(notificationRepositoryImpl());
const controller = notificationController(notificationRepository, utilsService);

const connectRabbitMQ = async (events: EventEmitter) => {
  try {
    const connection = await amqp.connect(config.rabbitmq.url);
    const channel = await connection.createChannel();
    //
    const notificationQueue = "realtime_server:set_notification";
    await channel.assertQueue(notificationQueue);

    // -- consumes --
    channel.consume(notificationQueue, async (message) => {
      if (message == null) return;
      const data = JSON.parse(message.content.toString());
      try {
        const response = await controller.addNewNotification(data?.userId, data?.data);
        events.emit("new_notification", data?.userId, response);
        channel.ack(message);
      } catch (error) {
        console.log(error);
      }
    });

    console.log(`[${config.server.serverId}] RabbitMQ Waiting for objects...`);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

export default connectRabbitMQ;
