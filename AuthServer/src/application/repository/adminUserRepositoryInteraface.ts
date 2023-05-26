import adminUserRepositoryImpl from "../../frameworks/databases/mongoDb/repository/adminRepositoryImpl";

const adminUserRepositoryInteraface = (respository: adminUserRepositoryImpl) => {
  const add = respository.add;
  const update = respository.update;
  const getByEmail = respository.getByEmail;

  return {
    add,
    update,
    getByEmail,
  };
};

type adminUserRepositoryInteraface = ReturnType<typeof adminUserRepositoryInteraface>;
export default adminUserRepositoryInteraface;
