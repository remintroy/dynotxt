import amqp from "amqplib";
import getConfigs from "../../configs";

const config = getConfigs();

const rabbitMqConnection = () => {
  const connectToMq = async () => {
    const connection = await amqp.connect(config.rabbitmq.url);
    const channel = await connection.createChannel();
    return channel;
  };

  const sendNotification = async (notificationData: any) => {
    const channel = await connectToMq();
    const quename = "realtime_server:set_notification";
    await channel.assertQueue(quename);
    const message = JSON.stringify(notificationData);
    channel.sendToQueue(quename, Buffer.from(message));
  };

  return {
    sendNotification,
  };
};

type rabbitMqConnection = ReturnType<typeof rabbitMqConnection>;
export default rabbitMqConnection;
