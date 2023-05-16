import flagsRepositoryImpl from "../../frameworks/mongoDb/repository/flagsReporitoryImpl";

const flagsRepositoryInterface = (repository: flagsRepositoryImpl) => {
  const addNewFlag = repository.addNewFlag;
  const removeFlag = repository.removeFlag;
  const updateFLagStatus = repository.updateFLagStatus;
  const getAllFlaggedBLogs = repository.getAllFlaggedBLogs;
  const removeAllFlagForSingBlog = repository.removeAllFlagForSingBlog;
  const getFlagsForSingleBlog = repository.getFlagsForSingleBlog;
  const updateStatusFlagsForSingleBlogAsDisabled = repository.updateStatusFlagsForSingleBlogAsDisabled;
  const updateStatusFlagsForSingleBlogAsEnabled = repository.updateStatusFlagsForSingleBlogAsEnabled;
  return {
    addNewFlag,
    removeFlag,
    updateFLagStatus,
    getAllFlaggedBLogs,
    removeAllFlagForSingBlog,
    getFlagsForSingleBlog,
    updateStatusFlagsForSingleBlogAsDisabled,
    updateStatusFlagsForSingleBlogAsEnabled,
  };
};

type flagsRepositoryInterface = ReturnType<typeof flagsRepositoryInterface>;
export default flagsRepositoryInterface;
