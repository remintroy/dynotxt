import { model } from "mongoose";
import notificationSchema from "./notifications.schema";

const NotificationModel = model<notificationSchema>("notifications", notificationSchema);

export default NotificationModel;
