import viewsRepositoryImpl from "../../frameworks/mongoDb/repository/viewsRepositoryImpl";

const viewsRepositoryInterface = (repository: viewsRepositoryImpl) => {
  const addViewByBlogId = repository.addViewByBlogId;
  const getViewsByBlogId = repository.getViewsByBlogId;
  const getAllViewsInLastNDays = repository.getAllViewsInLastNDays;
  const getAllViewsInLastNDaysWithBlogId = repository.getAllViewsInLastNDaysWithBlogId;

  return {
    addViewByBlogId,
    getViewsByBlogId,
    getAllViewsInLastNDays,
    getAllViewsInLastNDaysWithBlogId,
  };
};

type viewsRepositoryInterface = ReturnType<typeof viewsRepositoryInterface>;
export default viewsRepositoryInterface;
