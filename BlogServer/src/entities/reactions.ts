interface Reactions {
  blogId: string;
  userId: string;
  value: string;
  createAt: Date;
}

class Reactions {
  constructor({ blogId, userId, value, createAt }: Reactions) {
    this.blogId = blogId;
    this.userId = userId;
    this.value = value;
    this.createAt = createAt;
  }
}

export default Reactions;
