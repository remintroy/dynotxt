import { Request, Response } from "express";
import userSignin from "../../application/use-cases/user/signInUser";
import userRepositoryInteraface from "../../application/repository/userRepositoryInteraface";
import tokenRepositoryInteraface from "../../application/repository/tokensRepositoryInteraface";
import authServiceInterface from "../../application/services/authServices";
import refreshUser from "../../application/use-cases/user/refreshAccessToken";
import validatorInteraface from "../../application/services/validatorInteraface";
import { IUser } from "../../entities/user.normal";
import userUpdate from "../../application/use-cases/user/updateUser";
import userLogout from "../../application/use-cases/user/logoutUser";
import getUserFromRefreshToken from "../../application/use-cases/user/userDataFromRefreshToken";
import otpRepositoryInterface from "../../application/repository/otpRepositoyInteraface";
import verifyEmail from "../../application/use-cases/user/verifyEmail";
import userVerificationStatus from "../../application/use-cases/user/userVerificationStatus";
import getPublicUser from "../../application/use-cases/user/getPublicUser";

export interface IRequest extends Request {
  user: IUser;
}

const userController = (
  userRepository: ReturnType<typeof userRepositoryInteraface>,
  tokenRepository: ReturnType<typeof tokenRepositoryInteraface>,
  otpRepository: ReturnType<typeof otpRepositoryInterface>,
  authService: ReturnType<typeof authServiceInterface>,
  validator: ReturnType<typeof validatorInteraface>,
  createError,
  emailService
) => {
  const userPostSignin = async (req: IRequest, res?: Response) => {
    const { idToken } = req.body;
    const response = await userSignin(
      authService,
      userRepository,
      tokenRepository,
      otpRepository,
      validator,
      createError,
      emailService,
      idToken
    );
    const currentdate = new Date();
    const next3months = new Date(
      currentdate.setMonth(currentdate.getMonth() + 3)
    );
    res.cookie("refreshToken", response.refreshToken, {
      httpOnly: true,
      secure: true,
      expires: next3months,
    });
    response.refreshToken = null;
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

  const getUserLogout = async (req: IRequest, res: Response) => {
    const uid = req.user?.uid;
    const { refreshToken } = req.cookies;
    const response = await userLogout(
      tokenRepository,
      createError,
      refreshToken,
      uid
    );
    res.cookie("refreshToken", "");
    return response;
  };

  const getUserData = async (req: IRequest) => {
    const { refreshToken } = req.cookies;
    const response = await getUserFromRefreshToken(
      userRepository,
      validator,
      tokenRepository,
      authService,
      createError,
      refreshToken
    );
    return response;
  };

  const postVerifyEmail = async (req: IRequest, res: Response) => {
    const { uid } = req.params;
    const { otp } = req.body;
    const response = await verifyEmail(
      userRepository,
      otpRepository,
      authService,
      tokenRepository,
      createError,
      uid,
      otp
    );
    const currentdate = new Date();
    const next3months = new Date(
      currentdate.setMonth(currentdate.getMonth() + 3)
    );
    res.cookie("refreshToken", response.refreshToken, {
      httpOnly: true,
      secure: true,
      expires: next3months,
    });
    response.refreshToken = null;
    return response;
  };

  const getUserEmailVerificationStatus = async (req: IRequest) => {
    const { uid } = req.params;
    const typeofVerification = "email";
    const response = await userVerificationStatus(
      userRepository,
      createError,
      typeofVerification,
      uid
    );
    return response;
  };

  const getUserDataPublic = async (req: IRequest) => {
    const { id: userId } = req.params;
    const response = await getPublicUser(userRepository, createError, userId);
    return response;
  };

  return {
    userPostSignin,
    getUserRefresh,
    postUserUpdate,
    getUserLogout,
    getUserData,
    postVerifyEmail,
    getUserEmailVerificationStatus,
    getUserDataPublic,
  };
};

export default userController;
