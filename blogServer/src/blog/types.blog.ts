export interface IMakeBlogData {
  createdAt?: Date | string;
  updatedAt?: Date | string;
  published?: boolean;
  blogId: string;
  author: string;
  title: string;
  views?: number;
  bannerImgURL: string;
  body?: IMakeBlogDataBody[];
}

export interface IMakeBlogDataBodyBuild {
  title: string;
  data?: object | object[];
  id?: string;
  content?: string;
}

interface IMakeBlogDataBodyTypeCode extends IMakeBlogDataBodyBuild {
  type: "code";
  data: {
    language?: string;
    value: string;
  };
}

interface IMakeBlogDataBodyTypeText extends IMakeBlogDataBodyBuild {
  type: "text";
  data: string[];
}

interface IMakeBlogDataBodyTypeImg extends IMakeBlogDataBodyBuild {
  type: "img";
  data: {
    src: string;
    alt?: string;
  };
}

interface IMakeBlogDataBodyTypeList extends IMakeBlogDataBodyBuild {
  type: "list";
  data: string[];
}

interface IMakeBlogDataBodyTypeYoutube extends IMakeBlogDataBodyBuild {
  type: "youtube";
  data: {
    id?: string;
    url: string;
  };
}

export type IMakeBlogDataBody =
  | IMakeBlogDataBodyTypeCode
  | IMakeBlogDataBodyTypeText
  | IMakeBlogDataBodyTypeImg
  | IMakeBlogDataBodyTypeList
  | IMakeBlogDataBodyTypeYoutube;
