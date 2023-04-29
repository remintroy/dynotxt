export interface Blog {
  title?: string;
  subtitle?: string;
  createdAt?: Date;
  updatedAt?: Date;
  published?: boolean;
  blogId?: string;
  author?: string;
  views?: number;
  bannerImgURL?: string;
  version?: number;
  body?: [];
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
    this.views = blogData.views;
    this.bannerImgURL = blogData.bannerImgURL;
    this.body = blogData.body;
    this.version = blogData.version;
  }
}

export default {
  Blog,
};
