interface Likes {
  blogId: string;
  createdAt: Date;
  disabled: boolean;
  likes: [string];
}

class Likes {
  constructor({ blogId, createdAt, disabled, likes }: Likes) {
    this.blogId = blogId;
    this.createdAt = createdAt;
    this.disabled = disabled;
    this.likes = likes;
  }
}

export default Likes;
