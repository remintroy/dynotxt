import GetUtils from "dynotxt-common-services/build/utils";
import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";

const caseUserBlogsGetInPages = async (
  blogRepository: blogRepositoryInteraface,
  utilsService: GetUtils,
  currentUserId: string,
  userId: string,
  options?: { filter?: any; sort?: any; page?: number }
) => {
  try {
    //
    if (!userId) throw utilsService.createError(400, "Blog id is required");

    let blogsDataFromDb: any;
    try {
      blogsDataFromDb =
        currentUserId === userId
          ? await blogRepository.getAllBlogsDisplayWithUidWithPrivate(userId, options)
          : await blogRepository.getAllBlogsDisplayWithUid(userId, { page: options.page });
    } catch (error) {
      throw utilsService.createError(500, "Faild to fetch blog from server", error?.message);
    }

    return blogsDataFromDb;
  } catch (error) {
    console.log(error);
  }
};

export default caseUserBlogsGetInPages;
