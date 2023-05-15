import FlagsModel from "../models/flags";

const flagsRepositoryImpl = () => {
  const addNewFlag = async (blogId: string, userId: string, reason: string) => {
    return await new FlagsModel({ blogId, userId, reason, status: "created" }).save();
  };

  const removeFlag = async (blogId: string, flagId: string) => {
    return await FlagsModel.deleteOne({ blogId, _id: flagId });
  };

  const updateFLagStatus = async (blogId: string, flagId: string, status: string) => {
    return await FlagsModel.updateOne(
      { blogId, _id: flagId },
      {
        $set: { status: status },
      }
    );
  };

  return {
    addNewFlag,
    removeFlag,
    updateFLagStatus,
  };
};

type flagsRepositoryImpl = ReturnType<typeof flagsRepositoryImpl>;
export default flagsRepositoryImpl;
