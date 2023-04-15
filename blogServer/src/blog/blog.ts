interface IMakeBlogData {
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

interface IMakeBlogDataBodyBuild {
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

type IMakeBlogDataBody =
  | IMakeBlogDataBodyTypeCode
  | IMakeBlogDataBodyTypeText
  | IMakeBlogDataBodyTypeImg
  | IMakeBlogDataBodyTypeList
  | IMakeBlogDataBodyTypeYoutube;

export default function createMakeBlog({ validator }: { validator: any }) {
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

    const validateCreateAt = (createdAt: Date | string | any) => {
      if (!validator.isValidDate(createdAt)) throw new Error("A valid date must be provided in createdAt field");
      return createdAt;
    };

    const validateUpdatedAt = (updatedAt: Date | string | any) => {
      if (!validator.isValidDate(updatedAt)) throw new Error("A valid date must be provided in updatedAt field");
      return updatedAt;
    };

    const validateBodySection = (section: IMakeBlogDataBody) => {
      // required
      const validTypes = ["code", "img", "text", "list", "youtube"];
      if (!validTypes.includes(section.type.trim())) throw new Error("section type must be a valid type");
      if (!section.data) throw new Error("section data cannot be empty");
      if (typeof section.title !== "string") throw new Error("section title must be a string");

      // optional
      if (section.id && typeof section.id !== "string") throw new Error("section id must be a string");
      if (section.content && typeof section.content !== "string") throw new Error("section content must be a string");

      const output: IMakeBlogDataBody = {
        title: section.title,
        type: section.type,
        content: section.content ?? null,
        id: section.id ?? null,
        data: null,
      };

      switch (section.type) {
        case "code": {
          // required
          if (typeof section.data != "object") throw new Error("section data must be a object");
          const { language = "", value = "" } = section.data;
          if (!value) throw new Error("Code section data cannot be empty");
          if (typeof value != "string") throw new Error("value of code section must be a string");

          // optional
          if (language && typeof language != "string") throw new Error("language of code section must be a string");

          // result
          output.data = { language: language.length == 0 ? null : language, value: value };
          return output;
        }

        case "text": {
          if (!Array.isArray(section.data)) throw new Error("Section data of text must be an array of strings");
          for (const values of section.data) {
            if (typeof values != "string") throw new Error("Section data of text must be a array of string");
          }
          // filter empty array values
          section.data = section.data.filter((value) => value).map((value) => value.trim());
          output.data = section.data;
          return output;
        }

        case "img": {
          // required
          if (typeof section.data != "object") throw new Error("Image section body must be an object");
          if (!section.data.src) throw new Error("Image section need image URL");
          if (!validator.isValidUrl(section.data.src)) throw new Error("Image section Image URL is invalid");

          // optional
          if (section.data?.alt && typeof section.data.alt !== "string")
            throw new Error("Image section Image alternate text must be a string");

          output.data = {
            alt: section.data.alt ?? null,
            src: section.data.src,
          };
          return output;
        }

        case "list": {
          if (!Array.isArray(section.data)) throw new Error("Section data of list must be an array of strings");
          for (const values of section.data) {
            if (typeof values != "string") throw new Error("Section data of list must be a array of string");
          }
          // filter empty array values
          section.data = section.data.filter((value) => value).map((value) => value.trim());
          output.data = section.data;
          return output;
        }

        case "youtube": {
          // Required
          if (typeof section.data != "object") throw new Error("Youtube section body must be an object");
          if (!validator.isValidUrl(section.data.url)) throw new Error("Youtube section video link is invalid");

          // Optional
          if (section.data.id && typeof section.data.id !== "string")
            throw new Error("Youtube section video id must be a string");
          if (section.data.id && section.data.id.length > 15) throw new Error("Youtube section video id is not valid");

          output.data = {
            id: section.data.id ?? null,
            url: section.data.url,
          };

          return output;
        }

        default: {
          return null;
        }
      }
    };

    const validateBody = (body: IMakeBlogDataBody[]) => {
      if (!Array.isArray(body)) throw new Error("Blog body must be an array of blog content");

      for (let i = 0; i < body.length; i++) {
        body[i] = validateBodySection(body[i]);
      }

      // removes empty indexes from body
      body = body.filter((value) => {
        if (value?.type) return true;
        else false;
      });

      return body;
    };

    title = validateTitle(title);
    bannerImgURL = validateImgURL(bannerImgURL);
    views = validateViews(views);
    blogId = validateBlogId(blogId);
    author = validateAuthor(author);
    published = validatePublished(published);
    createdAt = validateCreateAt(createdAt);
    updatedAt = validateUpdatedAt(updatedAt);
    body = validateBody(body);

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

      setBodySectionIndex: (index: number, data: IMakeBlogDataBody) => {
        return (body[validateIndex(index)] = validateBodySection(data));
      },

      removeBodySectionIndex: (index: number) => {
        return body.splice(validateIndex(index), 1);
      },

      addToSectionBody: (data: IMakeBlogDataBody) => {
        return body.push(validateBodySection(data));
      },

      editSectionTitleInIndex: (index: number, newTitle: string) => {
        return (body[index].title = validateTitle(newTitle));
      },

      editSectionDataInIndex: (index: number, newSectionData: IMakeBlogDataBody) => {
        return (body[index] = validateBodySection({ ...body[index], ...newSectionData }));
      },
    });
  };
}
