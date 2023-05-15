import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";
import { Blog } from "../../../entities/blog";

const getBlogData = async (
  blogrepository: ReturnType<typeof blogRepositoryInteraface>,
  createError: any,
  blogId: string,
  user: string
) => {
  if (!blogId) throw createError(400, "Blog id is required to get blog data");

  let blogDataFromDb = await blogrepository.getBlogById(blogId);

  if (!blogDataFromDb) {
    blogDataFromDb = await blogrepository.getBlogByIdPrivate(blogId, user).catch((err) => {
      throw createError(500, "Something went wrong", err.message);
    });
    if (!blogDataFromDb) throw createError(400, "Not found, blog may not exist or it may be deleted");
  }

  if (!blogDataFromDb.published) {
    if (blogDataFromDb.author !== user) throw createError(403, "You dont have permission to access this blog");
  }

  const output: Blog = {
    author: blogDataFromDb.author,
    title: blogDataFromDb.title,
    subtitle: blogDataFromDb.subtitle,
    bannerImgURL: blogDataFromDb.bannerImgURL,
    createdAt: blogDataFromDb.createdAt,
    published: blogDataFromDb.published,
    body: blogDataFromDb.body?.[0],
    disabled: blogDataFromDb.disabled,
  };

  return output;
};

export default getBlogData;
