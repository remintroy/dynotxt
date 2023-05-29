import { Schema } from "mongoose";

interface notificationBase {
  createAt: Date;
  data: any;
  readed: boolean;
}

interface newBlog extends notificationBase {
  type: "new_blog";
}

interface withoutAction extends notificationBase {
  type: "without_action";
}

interface newLogin extends notificationBase {
  type: "new_login";
}

interface newFollow extends notificationBase {
  type: "new_follow";
}

interface newFollowRequest extends notificationBase {
  type: "new_follow_request";
}

export type notificationContent = newBlog | newLogin | withoutAction | newFollow | newFollowRequest;

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
      type: String,
      readed: Boolean,
      data: {},
    },
  ],
});

export default notificationSchema;
