import GetUtils from "dynotxt-common-services/build/utils";
import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";
import { Blog } from "../../../entities/blog";
import { blogValidator } from "../../validators/blog";

const caseUserBlogUpdate = async (
  blogRepository: ReturnType<typeof blogRepositoryInteraface>,
  utilsService: GetUtils,
  blogId: string,
  author: string,
  blogData: Blog
) => {
  const dataToCheck = { ...blogData, blogId, author };
  const validBlogData = blogValidator(dataToCheck, utilsService.createError, true);

  const existingBlogData = await blogRepository.getBlogById(blogId).catch(utilsService.throwInternalError());

  if (!existingBlogData) {
    throw utilsService.createError(400, "Cannot update non-existing blog");
  }

  if (existingBlogData.author !== author)
    throw utilsService.createError(400, "You dont have permission to publish blog");

  const dataToSave: Blog = {
    title: validBlogData.title,
    subtitle: validBlogData.subtitle,
    body: validBlogData.body,
    bannerImgURL: validBlogData.bannerImgURL,
    category: validBlogData.category,
    published: validBlogData.published,
  };

  return blogRepository.updateBlog(blogId, dataToSave).catch(utilsService.throwInternalError());
};

export default caseUserBlogUpdate;
