import GetUtils from "dynotxt-common-services/build/utils";
import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";

const caseUserBlogMakePrivate = async (
  blogrepository: blogRepositoryInteraface,
  utilsService: GetUtils,
  blogId: string,
  user: string
) => {
  if (!blogId) throw utilsService.createError(400, "Blog id is required to publish blog");
  if (!user) throw utilsService.createError(400, "Userid is required to publish blog");

  const existingData = await blogrepository.getBlogById(blogId).catch(utilsService.throwInternalError());

  if (!existingData) throw utilsService.createError(400, "Blogid is required to publish blog");

  if (existingData.author !== user) throw utilsService.createError(400, "You dont have permission to publish blog");

  return await blogrepository
    .changeVisiblity(blogId, "private")
    .catch(utilsService.throwInternalError("Something went wrong while making blog private"));
};

export default caseUserBlogMakePrivate;
