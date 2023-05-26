import GetUtils from "dynotxt-common-services/build/utils";
import viewsRepositoryInterface from "../../../adaptor/repositorys/viewsRepositoryInterface";
import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";

const caseUserViewsAddNew = async (
  viewsRepository: viewsRepositoryInterface,
  blogRepository: blogRepositoryInteraface,
  utilService: GetUtils,
  blogId: string
) => {
  if (!blogId) throw utilService.createError(400, "BlogId is required");
  const blogDataFromRepository = await blogRepository.getBlogById(blogId).catch(utilService.throwInternalError());
  if (!blogDataFromRepository) throw utilService.createError(400, "BlogId not exists to add view count");
  await viewsRepository.addViewByBlogId(blogId, blogDataFromRepository.author).catch(utilService.throwInternalError());
};

export default caseUserViewsAddNew;
