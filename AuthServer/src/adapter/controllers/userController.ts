import { Request, Response } from "express";
import { IUser } from "../../entities/user.normal";
import userRepositoryInteraface from "../../application/repository/userRepositoryInteraface";
import tokenRepositoryInteraface from "../../application/repository/tokensRepositoryInteraface";
import authServiceInterface from "../../application/services/authServices";
import otpRepositoryInterface from "../../application/repository/otpRepositoyInteraface";
import validatorInteraface from "../../application/services/validatorInteraface";
import getUserFromRefreshToken from "../../application/use-cases/user/user-data-from-refresh-token";
import userVerificationStatus from "../../application/use-cases/user/user-verification-status";
import userSignin from "../../application/use-cases/user/signin-user";
import refreshUser from "../../application/use-cases/user/refresh-access-token";
import userUpdate from "../../application/use-cases/user/update-user";
import userLogout from "../../application/use-cases/user/logout-user";
import verifyEmail from "../../application/use-cases/user/verify-email";
import getPublicUser from "../../application/use-cases/user/get-public-user-data";
import caseGetFullDetailsOfSingleUser from "../../application/use-cases/user/get-user-full-details";
import updatePublicUserData from "../../application/use-cases/user/update-user-public-details";
import updatePersonalUserData from "../../application/use-cases/user/update-user-personal-details";
import caseAddNewFollow from "../../application/use-cases/user/follow-user";
import followsRepositoryInterface from "../../application/repository/followsRepositoryInterface";
import caseGetFollowingStatus from "../../application/use-cases/user/get-following-status";
import caseUnfollowUser from "../../application/use-cases/user/unfollow-user";

export interface IRequest extends Request {
  user: IUser;
}

const userController = (
  userRepository: userRepositoryInteraface,
  tokenRepository: tokenRepositoryInteraface,
  otpRepository: otpRepositoryInterface,
  followsRepository: followsRepositoryInterface,
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

  const getNewAccessTokenFromRefreshToken = async (req: IRequest) => {
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

  const putCurrentUserData = async (req: IRequest) => {
    const uid = req.user?.uid;
    const data = req.body;
    const response = await userUpdate(userRepository, createError, data, uid);
    return response;
  };

  const putUpdatePublicUserData = async (req: IRequest) => {
    const uid = req.user?.uid;
    const data = req.body;
    const response = await updatePublicUserData(
      userRepository,
      createError,
      data,
      uid
    );
    return response;
  };

  const putUpdatePersionalUserData = async (req: IRequest) => {
    const uid = req.user?.uid;
    const data = req.body;
    const response = await updatePersonalUserData(
      userRepository,
      createError,
      data,
      uid
    );
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

  const getInitialUserDataFromRefreshToken = async (req: IRequest) => {
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

  const postVerifyEmailWithOtp = async (req: IRequest, res: Response) => {
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
    const response = await getPublicUser(
      userRepository,
      followsRepository,
      createError,
      userId
    );
    return response;
  };

  const getDataForCurrentUserDashboard = async (req: IRequest) => {
    const { user } = req;
    const response = await caseGetFullDetailsOfSingleUser(createError, user);
    return response;
  };

  const postFollowNewUser = async (req: IRequest) => {
    const { uid: uidToFollow } = req.params;
    const { user } = req;
    const response = await caseAddNewFollow(
      followsRepository,
      userRepository,
      createError,
      user,
      uidToFollow
    );
    return response;
  };

  const getFollowingDataWithSingleUser = async (req: IRequest) => {
    const { user } = req;
    const { uid: uidToCheck } = req.params;
    const response = await caseGetFollowingStatus(
      followsRepository,
      createError,
      user,
      uidToCheck
    );
    return response;
  };

  const deleteUnfollowUser = async (req: IRequest) => {
    const { user } = req;
    const { uid: userIdToUnfollow } = req.params;
    const response = await caseUnfollowUser(
      followsRepository,
      createError,
      user,
      userIdToUnfollow
    );
    return response;
  };

  return {
    userPostSignin,
    getNewAccessTokenFromRefreshToken,
    putCurrentUserData,
    getUserLogout,
    getInitialUserDataFromRefreshToken,
    postVerifyEmailWithOtp,
    getUserEmailVerificationStatus,
    getUserDataPublic,
    getDataForCurrentUserDashboard,
    putUpdatePersionalUserData,
    putUpdatePublicUserData,
    postFollowNewUser,
    getFollowingDataWithSingleUser,
    deleteUnfollowUser,
  };
};

export default userController;
