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
      { $unwind: "$notifications" },
      { $match: { "notifications.readed": false } },
    ]);
  };

  const getAllNotifications = async (userId: string) => {
    return await NotificationModel.aggregate([
      { $match: { userId } },
      {
        $unwind: "$notifications",
      },
      {
        $project: {
          data: "$notifications",
        },
      },
      { $replaceRoot: { newRoot: "$data" } },
    ]);
  };

  return {
    addNotification,
    getAllNotifications,
    getAllUnreadedNotifications,
  };
};

type notificationRepositoryImpl = ReturnType<typeof notificationRepositoryImpl>;
export default notificationRepositoryImpl;
