import GetUtils from "dynotxt-common-services/build/utils";
import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";

const caseUserBlogMakePublic = async (
  blogrepository: blogRepositoryInteraface,
  utilsService: GetUtils,
  blogId: string,
  user: string
) => {
  if (!blogId) throw utilsService.createError(400, "Blog id is required to publish blog");
  if (!user) throw utilsService.createError(400, "Userid is required to publish blog");

  const existingData = await blogrepository.getBlogById(blogId);

  if (!existingData) throw utilsService.createError(400, "Blogid is required to publish blog");

  if (existingData.author !== user) throw utilsService.createError(400, "You dont have permission to publish blog");

  return await blogrepository
    .changeVisiblity(blogId, "public")
    .catch(utilsService.throwInternalError("Faild to publish blog"));
};

export default caseUserBlogMakePublic;
