export interface Blog {
  title?: string;
  subtitle?: string;
  createdAt?: Date;
  updatedAt?: Date;
  trashedAt?: Date;
  deletedAt?: Date;
  published?: boolean;
  blogId?: string;
  author?: string;
  bannerImgURL?: string;
  version?: number;
  body?: [any];
  trashed?: boolean;
  disabled?: boolean;
  category?: string[];
}

export class Blog {
  constructor(blogData: Blog) {
    this.author = blogData.author;
    this.title = blogData.title;
    this.subtitle = blogData.subtitle;
    this.createdAt = blogData.createdAt;
    this.updatedAt = blogData.updatedAt;
    this.published = blogData.published;
    this.blogId = blogData.blogId;
    this.bannerImgURL = blogData.bannerImgURL;
    this.body = blogData.body;
    this.version = blogData.version;
    this.trashed = blogData.trashed;
    this.disabled = blogData.disabled;
    this.trashedAt = blogData.trashedAt;
    this.deletedAt = blogData.deletedAt;
    this.category = blogData.category;
  }
}

export default {
  Blog,
};
