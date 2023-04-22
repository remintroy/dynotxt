import { Request } from "express";
import userSignin from "../../application/use-cases/user/signIn";
import userRepositoryInteraface from "../../application/repository/userRepositoryInteraface";
import tokenRepositoryInteraface from "../../application/repository/tokensRepositoryInteraface";
import authServiceInterface from "../../application/services/authServices";
import refreshUser from "../../application/use-cases/user/refresh";
import validatorInteraface from "../../application/services/validatorInteraface";
import { IUser } from "../../entities/user.normal";
import userUpdate from "../../application/use-cases/user/update";

export interface IRequest extends Request {
  user: IUser;
}

const userController = (
  userRepository: ReturnType<typeof userRepositoryInteraface>,
  tokenRepository: ReturnType<typeof tokenRepositoryInteraface>,
  authService: ReturnType<typeof authServiceInterface>,
  validator: ReturnType<typeof validatorInteraface>,
  createError,
  emailService
) => {
  const userPostSignin = async (req: IRequest) => {
    const { idToken } = req.body;
    const response = await userSignin(
      authService,
      userRepository,
      tokenRepository,
      validator,
      createError,
      emailService,
      idToken
    );
    return response;
  };

  const getUserRefresh = async (req: IRequest) => {
    const { refreshToken } = req.cookies;
    const response = await refreshUser(
      tokenRepository,
      userRepository,
      authService,
      validator,
      createError,
      refreshToken
    );
    return response;
  };

  const postUserUpdate = async (req: IRequest) => {
    const uid = req.user?.uid;
    const data = req.body;
    const response = await userUpdate(userRepository, createError, data, uid);
    return response;
  };

  return {
    userPostSignin,
    getUserRefresh,
    postUserUpdate,
  };
};

export default userController;
