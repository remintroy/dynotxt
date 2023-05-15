import flagsRepositoryImpl from "../../frameworks/mongoDb/repository/flagsReporitoryImpl";

const flagsRepositoryInterface = (repository: flagsRepositoryImpl) => {
  const addNewFlag = repository.addNewFlag;
  const removeFlag = repository.removeFlag;
  const updateFLagStatus = repository.updateFLagStatus;
  const getAllFlaggedBLogs = repository.getAllFlaggedBLogs;
  const removeAllFlagForSingBlog = repository.removeAllFlagForSingBlog;
  return {
    addNewFlag,
    removeFlag,
    updateFLagStatus,
    getAllFlaggedBLogs,
    removeAllFlagForSingBlog,
  };
};

type flagsRepositoryInterface = ReturnType<typeof flagsRepositoryInterface>;
export default flagsRepositoryInterface;
