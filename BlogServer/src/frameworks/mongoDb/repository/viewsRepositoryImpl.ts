import ViewsModel from "../models/views";

const viewsRepositoryImpl = () => {
  const addViewByBlogId = async (blogId: string, userId: string) => {
    return await new ViewsModel({ blogId, userId }).save();
  };

  const getViewsByBlogId = async (blogId: string) => {
    return await ViewsModel.aggregate([
      { $match: { blogId } },
      {
        $group: {
          _id: "$blogId",
          count: { $sum: 1 },
        },
      },
      { $project: { _id: 0, blogId: "$_id" } },
    ])?.[0];
  };

  const getAllViewsInLastNDays = async (userId: string, lastNDays: number) => {
    const currentDate: any = new Date();
    const calculatedDate = currentDate - (lastNDays ?? 10) * 60 * 60 * 24 * 1000;
    return await ViewsModel.aggregate([
      { $match: { userId, createdAt: { $gte: new Date(calculatedDate) } } },
      {
        $group: {
          _id: { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } },
          count: { $sum: 1 },
          blogId: { $first: "$blogId" },
          userId: { $first: "$userId" },
        },
      },
      { $project: { _id: 0, date: "$_id", count: 1, blogId: 1, userId: 1 } },
      { $sort: { date: 1 } },
    ]);
  };

  return {
    addViewByBlogId,
    getViewsByBlogId,
    getAllViewsInLastNDays,
  };
};

type viewsRepositoryImpl = ReturnType<typeof viewsRepositoryImpl>;
export default viewsRepositoryImpl;
