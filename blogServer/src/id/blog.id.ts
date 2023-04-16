export default function createBlogId(
  randomId: any,
  {
    minLength,
    maxLength,
    length,
    pattern,
    isBlogWithIdExist,
  }: {
    maxLength: number;
    minLength: number;
    length: number;
    pattern: string;
    isBlogWithIdExist: (blogId: string) => Promise<boolean>;
  }
) {
  return {
    createId: async () => {
      let blogId: string;

      do {
        blogId = randomId(length, pattern);
      } while (await isBlogWithIdExist(blogId));

      return blogId;
    },
    isValidLength: (id: string) => {
      return id.length >= minLength && id.length <= maxLength;
    },
  };
}
