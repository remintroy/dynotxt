import { IUser } from "../../entities/user.normal";

export default function useDbrRepository(respository) {
  // const respository = getRespository();

  const add = (data: IUser) => respository.add(data);
  const update = (uid: string, data: IUser) => respository.update(uid, data);
  const getById = (uid: string) => respository.getById(uid);

  return {
    add,
    update,
    getById,
  };
}
