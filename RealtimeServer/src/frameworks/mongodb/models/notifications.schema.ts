import { Schema } from "mongoose";

interface notificationBase {
  createdAt: Date;
  data: any;
  readed: boolean;
}

interface newBlog extends notificationBase {
  noti_type: "new_blog";
}

interface withoutAction extends notificationBase {
  noti_type: "without_action";
}

interface newLogin extends notificationBase {
  noti_type: "new_login";
}

interface newFollow extends notificationBase {
  noti_type: "new_follow";
}

interface newFollowRequest extends notificationBase {
  noti_type: "new_follow_request";
}

interface emailVerified extends notificationBase {
  noti_type: "email_verified";
}

export type notificationContent = emailVerified | newBlog | newLogin | withoutAction | newFollow | newFollowRequest;

interface notificationSchema {
  userId: string;
  createdAt: Date;
  notifications: [notificationContent];
}

const notificationSchema = new Schema({
  userId: String,
  createdAt: Date,
  notifications: [
    {
      noti_type: String,
      readed: Boolean,
      data: {},
      createdAt: {
        type: Date,
        default: new Date(),
      },
    },
  ],
});

export default notificationSchema;
