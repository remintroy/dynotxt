import { blogValidator } from "../validator";

interface IMakeBlogData {
  createdAt: Date | string;
  updatedAt: Date | string;
  published: boolean;
  blogId: string;
  author: string;
  title: string;
  views: number;
  bannerImgURL: string;
  body: IMakeBlogDataBody[];
}

interface IMakeBlogDataBody {
  title: string;
  type: "code" | "img" | "text" | "list" | "youtube";
  data: string | object;
  id?: string;
  content?: string;
}

export default function buildMakeBlog({ validator }: { validator: typeof blogValidator }) {
  return function makeBlog({
    createdAt = new Date(),
    updatedAt = new Date(),
    published = false,
    blogId,
    author,
    title,
    views = 0,
    bannerImgURL,
    body = [],
  }: IMakeBlogData) {
    // VALIDATION FUNCTIONS
    const validateTitle = (title: string): string => {
      if (!title) throw new Error("A title required to create a blog");
      if (typeof title != "string") throw new Error("Title must be a string");
      return (title = title.trim());
    };

    const validateImgURL = (imgURL: string): string => {
      if (!validator.isValidUrl(imgURL)) throw new Error("Banner image url must be a valid url");
      return (imgURL = imgURL.trim());
    };

    const validateIndex = (index: number): number => {
      if (typeof index != "number") throw new Error("Index must be a number");
      return index;
    };

    const validateViews = (viewCount: number): number => {
      if (typeof viewCount != "number") throw new Error("View must be a number");
      if (viewCount < 0) throw new Error("view must be a positive integer");
      return viewCount;
    };

    const validateBlogId = (blogId: string): string => {
      if (!blogId) throw new Error("A valid blog ID required to create a blog");
      if (typeof blogId != "string") throw new Error("Blog ID must be a string");
      return (blogId = blogId.trim());
    };

    const validateAuthor = (author: string): string => {
      if (!author) throw new Error("A valid author uid required to create a blog");
      if (typeof author != "string") throw new Error("author uid must be a string");
      return (author = author.trim());
    };

    const validatePublished = (published: boolean) => {
      if (typeof published != "boolean") throw new Error("Published must be true or false");
      return published;
    };

    const validateCreateAt = (createdAt: Date | string) => {
      if (!validator.isValidDate(`${createdAt}`)) throw new Error("A valid date must be provided in createdAt field");
      return createdAt;
    };

    const validateUpdatedAt = (updatedAt: Date | string) => {
      if (!validator.isValidDate(`${updatedAt}`)) throw new Error("A valid date must be provided in updatedAt field");
      return updatedAt;
    };

    const validateBody = (body: IMakeBlogDataBody[]) => {
      if (!Array.isArray(body)) throw new Error("Blog body must be an array of blog content");
      return body;
    };

    validateTitle(title);
    validateImgURL(bannerImgURL);
    validateViews(views);
    validateBlogId(blogId);
    validateAuthor(author);
    validatePublished(published);
    validateCreateAt(createdAt);
    validateUpdatedAt(updatedAt);
    validateBody(body);

    // UPDATE FUNCTIONS
    const setUpdated = (input?: any | null) => {
      updatedAt = new Date();
      return input ?? null;
    };

    return Object.freeze({
      // methord's without inputs
      getId: () => blogId,
      setBody: () => setUpdated(body),
      addViewCount: () => setUpdated(++views),
      decreaseViewCount: () => setUpdated(views > 0 ? --views : (views = 0)),
      unPublish: () => setUpdated((published = false)),
      publish: () => setUpdated((published = true)),
      isPublished: () => published,
      getBody: () => body,
      getAuthor: () => author,
      getUpdated: () => updatedAt,
      getCreated: () => createdAt,
      getData: () => {
        return { createdAt, updatedAt, published, blogId, author, title, views, bannerImgURL, body };
      },

      // methords with input which need to be validated
      setViewCount: (newViewCount: number) => {
        return setUpdated((views = ~~validateViews(newViewCount)));
      },

      setBannerImgURL: (newURL: string) => {
        return setUpdated((bannerImgURL = validateImgURL(newURL)));
      },

      setTitle: (newTitle: string) => {
        return setUpdated((title = validateTitle(newTitle)));
      },

      setBodyIndex: (index: number, data: IMakeBlogDataBody) => {
        return (body[validateIndex(index)] = data);
      },

      removeBodyIndex: (index: number) => {
        return body.splice(validateIndex(index), 1);
      },

      addToBody: (data: IMakeBlogDataBody) => {
        return body.push(data);
      },

      editBodyTitleInIndex: (index: number, newTitle: string) => {
        return (body[index].title = validateTitle(newTitle));
      },
    });
  };
}
