import NotificationModel from "../models/notifications";
import { notificationContent } from "../models/notifications.schema";

const notificationRepositoryImpl = () => {
  const getAllUnreadedNotifications = async (userId: string) => {
    return await NotificationModel.aggregate([
      { $match: { userId } },
      { $unwind: "$notifications" },
      { $match: { "notifications.readed": false } },
      { $sort: { "notifications.createdAt": -1 } },
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
      { $sort: { createdAt: -1 } },
    ]);
  };

  const addNotification = async (userId: string, notificationData: notificationContent) => {
    const existingData = await NotificationModel.findOne({ userId });
    if (!existingData) {
      await new NotificationModel({ userId, notifications: notificationData }).save();
    } else {
      existingData.notifications.push(notificationData);
      await existingData.save();
    }

    return await getAllNotifications(userId);
  };

  return {
    addNotification,
    getAllNotifications,
    getAllUnreadedNotifications,
  };
};

type notificationRepositoryImpl = ReturnType<typeof notificationRepositoryImpl>;
export default notificationRepositoryImpl;
