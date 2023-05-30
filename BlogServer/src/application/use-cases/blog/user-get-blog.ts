import GetUtils from "dynotxt-common-services/build/utils";
import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";

const caseUserBlogGet = async (
  blogrepository: ReturnType<typeof blogRepositoryInteraface>,
  utilsService: GetUtils,
  blogId: string,
  user: string
) => {
  if (!blogId) throw utilsService.createError(400, "Blog id is required to get blog data");

  let blogDataFromDb = await blogrepository.getBlogById(blogId).catch(utilsService.throwInternalError());

  if (!blogDataFromDb) {
    blogDataFromDb = await blogrepository.getBlogByIdPrivate(blogId, user).catch((err) => {
      throw utilsService.createError(500, "Something went wrong", err.message);
    });
    if (!blogDataFromDb) throw utilsService.createError(400, "Not found, blog may not exist or it may be deleted");
  }

  if (!blogDataFromDb.published) {
    if (blogDataFromDb.author !== user) {
      throw utilsService.createError(403, "You dont have permission to access this blog");
    }
  }

  return blogDataFromDb;
};

export default caseUserBlogGet;
