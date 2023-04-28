export interface Blog {
  title: string;
  subtitle: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  blogId: string;
  author: string;
  views: number;
  bannerImgURL: string;
  body: [];
}
