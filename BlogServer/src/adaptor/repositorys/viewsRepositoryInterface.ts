import viewsRepositoryImpl from "../../frameworks/mongoDb/repository/viewsRepositoryImpl";

const viewsRepositoryInterface = (repository: viewsRepositoryImpl) => {
  const addViewByBlogId = repository.addViewByBlogId;
  const getViewsByBlogId = repository.getViewsByBlogId;
  const getAllViewsInLastNDays = repository.getAllViewsInLastNDays;

  return {
    addViewByBlogId,
    getViewsByBlogId,
    getAllViewsInLastNDays,
  };
};

type viewsRepositoryInterface = ReturnType<typeof viewsRepositoryInterface>;
export default viewsRepositoryInterface;
