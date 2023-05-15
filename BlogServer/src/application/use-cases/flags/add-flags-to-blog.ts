import flagsRepositoryInterface from "../../../adaptor/repositorys/flagsRepositoryInterface";

const caseAddNewFlag = async (
  flagsRepository: flagsRepositoryInterface,
  createError: any,
  currentUserId: string,
  blogId: string,
  flagMessage: string
) => {
  if (!flagMessage) throw createError(400, "You must specify a flag message");
  if (!blogId) throw createError(400, "Blog ID must be provided");
  
  return flagsRepository.addNewFlag(blogId, currentUserId, flagMessage).catch(() => {
    throw createError(500, "Failed to report");
  });
};

type caseAddNewFlag = typeof caseAddNewFlag;
export default caseAddNewFlag;
