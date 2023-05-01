export interface CommentContentReplays {
  uid?: string;
  createdAt?: string;
  message?: string;
}

export interface CommentContent {
  _id?: string;
  uid?: string;
  createdAt?: Date;
  message?: string;
  replays?: [CommentContentReplays];
}

interface Comment {
  _id?: string;
  owner?: string;
  disabled?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  blogId?: string;
  newComment?: CommentContent;
  comment?: [CommentContent];
}

class Comment {
  constructor({
    createdAt,
    updatedAt,
    blogId,
    comment,
    owner,
    disabled,
  }: Comment) {
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.blogId = blogId;
    this.comment = comment;
    this.owner = owner;
    this.disabled = disabled;
  }
}

export default Comment;
