import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";
import { Blog } from "../../../entities/blog";

const getBlogDataToEdit = async (
  blogrepository: blogRepositoryInteraface,
  createError,
  blogId: string,
  user: string
) => {
  if (!blogId) throw createError(400, "Blog id is required to get blog data");

  const blogDataFromDb = await blogrepository.getBlogById(blogId);

  if (!blogDataFromDb) {
    throw createError(400, "Cannot retreive blog data, As blog not exist or it may be deleted");
  }

  if (blogDataFromDb.author !== user) {
    throw createError(403, "You dont have permission to access this blog");
  }

  const output: Blog = {
    author: blogDataFromDb.author,
    title: blogDataFromDb.title,
    subtitle: blogDataFromDb.subtitle,
    bannerImgURL: blogDataFromDb.bannerImgURL,
    createdAt: blogDataFromDb.createdAt,
    published: blogDataFromDb.published,
    body: blogDataFromDb.body?.[0],
  };

  return output;
};

export default getBlogDataToEdit;
