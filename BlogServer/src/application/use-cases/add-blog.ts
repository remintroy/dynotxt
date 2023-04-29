import blogRepositoryInteraface from "../../adaptor/repositorys/blogRepositoryInteraface";
import validatorInterface from "../../adaptor/validator";
import { Blog } from "../../entities/blog";

const addNewBlog = async (
  blogRepository: ReturnType<typeof blogRepositoryInteraface>,
  createError,
  blogData: Blog,
  validator: ReturnType<typeof validatorInterface>
) => {
  const { title, body, blogId, version, bannerImgURL, author, subtitle } =
    blogData;
  const finalBlogData: Blog = {};

  try {
    // basic validation
    if (title)
      finalBlogData.title = (await validator.isValidTitle(title)).trim();
    if (subtitle)
      finalBlogData.subtitle = (await validator.isValidTitle(subtitle)).trim();
    if (bannerImgURL)
      finalBlogData.bannerImgURL = (
        await validator.isValidUrl(bannerImgURL)
      ).trim();
    if (body) finalBlogData.body = body;
  } catch (error) {
    // console.log(error);
  }
};

export default addNewBlog;
