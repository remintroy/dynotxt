import flagsRepositoryImpl from "../../frameworks/mongoDb/repository/flagsReporitoryImpl";

const flagsRepositoryInterface = (repository: flagsRepositoryImpl) => {
  const addNewFlag = repository.addNewFlag;
  const removeFlag = repository.removeFlag;
  const updateFLagStatus = repository.updateFLagStatus;
  return {
    addNewFlag,
    removeFlag,
    updateFLagStatus,
  };
};

type flagsRepositoryInterface = ReturnType<typeof flagsRepositoryInterface>;
export default flagsRepositoryInterface;
