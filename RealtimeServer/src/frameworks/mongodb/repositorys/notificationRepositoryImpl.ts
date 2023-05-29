import NotificationModel from "../models/notifications";
import { notificationContent } from "../models/notifications.schema";

const notificationRepositoryImpl = () => {
  const addNotification = async (userId: string, notificationData: notificationContent) => {
    const existingData = await NotificationModel.findOne({ userId });
    if (!existingData) return await new NotificationModel({ userId, notifications: [notificationData] }).save();
    existingData.notifications.push(notificationData);
    return await existingData.save();
  };

  const getAllUnreadedNotifications = async (userId: string) => {
    return await NotificationModel.aggregate([
      { $match: { userId } },
      { $unset: "$notifications" },
      { $match: { "notifications.readed": false } },
    ]);
  };

  return {
    addNotification,
    getAllUnreadedNotifications,
  };
};

type notificationRepositoryImpl = ReturnType<typeof notificationRepositoryImpl>;
export default notificationRepositoryImpl;
