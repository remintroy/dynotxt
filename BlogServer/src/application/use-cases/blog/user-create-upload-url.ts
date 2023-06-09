import GetUtils from "dynotxt-common-services/build/utils";
import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";
import blogServiceInterface from "../../../adaptor/service";
import { blogValidator } from "../../validators/blog";

const caseUserBlogCreateBannerUploadUrl = async (
  blogRepository: blogRepositoryInteraface,
  blogService: blogServiceInterface,
  utilsService: GetUtils,
  blogId: string,
  author: string
) => {
  const validBlogData = blogValidator({ blogId, author }, utilsService.createError);
  const existingBlogData = await blogRepository.getBlogById(validBlogData.blogId);

  if (!existingBlogData) {
    throw utilsService.createError(400, "Cannot create url for blog banner without valid blog");
  }

  if (existingBlogData.author !== validBlogData.author) {
    throw utilsService.createError(400, "You dont have permission to create banner url for this blog");
  }

  try {
    const key = `${validBlogData.blogId}-banner`;
    const blogBannerUploadUrl = await blogService.createBannerUploadUrl(key);
    return {
      url: blogBannerUploadUrl,
    };
  } catch (error) {
    throw utilsService.createError(500, "Faild to create banner upload url");
  }
};

export default caseUserBlogCreateBannerUploadUrl;
