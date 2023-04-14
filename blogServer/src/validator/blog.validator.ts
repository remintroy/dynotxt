import validator from "validator";

export const createBlogValidator = ({ getBlogById }) => {
  const isBlogWithIdExist = async (postId: string): Promise<boolean> => (await getBlogById(postId)) != null;
  const isValidDate = (date: string): boolean => validator.isDate(date);
  const isValidUrl = (url: string): boolean => validator.isURL(url);

  return Object.freeze({
    isBlogWithIdExist,
    isValidDate,
    isValidUrl,
  });
};
