export interface IBlogModel {
    createdAt: Date;
    updatedAt: Date;
    published: boolean;
    blogId: string;
    author: string;
    title: string;
    views: number;
    bannerImgURL: string;
    body: [];
  }