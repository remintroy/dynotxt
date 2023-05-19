import GetUtils from "dynotxt-common-services/build/utils";
import flagsRepositoryInterface from "../../../adaptor/repositorys/flagsRepositoryInterface";

const caseUserFlagsAdd = async (
  flagsRepository: flagsRepositoryInterface,
  utilsService: GetUtils,
  currentUserId: string,
  blogId: string,
  flagMessage: string
) => {
  if (!flagMessage) throw utilsService.createError(400, "You must specify a flag message");
  if (!blogId) throw utilsService.createError(400, "Blog ID must be provided");

  return flagsRepository
    .addNewFlag(blogId, currentUserId, flagMessage)
    .catch(utilsService.throwInternalError("Someting went wrong while reporting blog"));
};

export default caseUserFlagsAdd;
