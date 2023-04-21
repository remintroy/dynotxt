import { IUser } from "../../../../entities/user.normal";
import userModel from "../models/user";

export default class userRepositoryMongoDB {
  add = async (user: IUser) => {
    return await new userModel(user).save();
  };
  update = async (uid: string, data: IUser) => {
    return await userModel.updateOne(
      { uid },
      {
        $set: data,
      }
    );
  };
  getById = async (uid: string) => {
    return await userModel.findOne({ uid });
  };
}

// export function usedrRepositoryMongoDB() {
//   const add = async (user: IUser) => {
//     return await new userModel(user).save();
//   };
//   const update = async (uid: string, data: IUser) => {
//     return await userModel.updateOne(
//       { uid },
//       {
//         $set: data,
//       }
//     );
//   };
//   const getById = async (uid: string) => {
//     return await userModel.findOne({ uid });
//   };
//   return {
//     add,
//     update,
//     getById,
//   };
// }
