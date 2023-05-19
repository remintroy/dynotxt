import { Request, Response } from "express";
import { User } from "../../entities/user.normal";
import userRepositoryInteraface from "../../application/repository/userRepositoryInteraface";
import tokenRepositoryInteraface from "../../application/repository/tokensRepositoryInteraface";
import authServiceInterface from "../../application/services/authServices";
import otpRepositoryInterface from "../../application/repository/otpRepositoyInteraface";
import validatorInteraface from "../../application/services/validatorInteraface";
import getUserFromRefreshToken from "../../application/use-cases/user/user-data-from-refresh-token";
import userVerificationStatus from "../../application/use-cases/user/user-get-verification-status";
import userSignin from "../../application/use-cases/user/user-signin";
import refreshUser from "../../application/use-cases/user/user-refresh-access-token";
import userUpdate from "../../application/use-cases/user/user-update-data";
import userLogout from "../../application/use-cases/user/user-logout";
import verifyEmail from "../../application/use-cases/user/user-verify-email";
import getPublicUser from "../../application/use-cases/user/user-get-public-data";
import caseGetFullDetailsOfSingleUser from "../../application/use-cases/user/user-get-full-data";
import updatePublicUserData from "../../application/use-cases/user/user-update-public-data";
import updatePersonalUserData from "../../application/use-cases/user/user-update-personal-data";
import caseAddNewFollow from "../../application/use-cases/user/user-new-follow";
import followsRepositoryInterface from "../../application/repository/followsRepositoryInterface";
import caseGetFollowingStatus from "../../application/use-cases/user/user-follow-status";
import caseUnfollowUser from "../../application/use-cases/user/user-unfollow";
import GetJwt from "dynotxt-common-services/build/jwt";
import GetUtils from "dynotxt-common-services/build/utils";
import GetEmail from "dynotxt-common-services/build/email";

export interface IRequest extends Request {
  user: User;
}

const userController = (
  userRepository: userRepositoryInteraface,
  tokenRepository: tokenRepositoryInteraface,
  otpRepository: otpRepositoryInterface,
  followsRepository: followsRepositoryInterface,
  authService: authServiceInterface,
  validator: validatorInteraface,
  jwtService: GetJwt,
  emailService: GetEmail,
  utilsService: GetUtils
) => {
  const userPostSignin = async (req: IRequest, res?: Response) => {
    const { idToken } = req.body;
    const response = await userSignin(
      authService,
      userRepository,
      tokenRepository,
      otpRepository,
      validator,
      jwtService,
      emailService,
      utilsService,
      idToken
    );
    const currentdate = new Date();
    const next3months = new Date(currentdate.setMonth(currentdate.getMonth() + 3));
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
    return await refreshUser(tokenRepository, userRepository, utilsService, jwtService, refreshToken);
  };

  const putCurrentUserData = async (req: IRequest) => {
    const uid = req.user?.uid;
    const data = req.body;
    return await userUpdate(userRepository, utilsService, data, uid);
  };

  const putUpdatePublicUserData = async (req: IRequest) => {
    const uid = req.user?.uid;
    const data = req.body;
    return await updatePublicUserData(userRepository, utilsService, data, uid);
  };

  const putUpdatePersionalUserData = async (req: IRequest) => {
    const uid = req.user?.uid;
    const data = req.body;
    return await updatePersonalUserData(userRepository, utilsService, data, uid);
  };

  const getUserLogout = async (req: IRequest, res: Response) => {
    const uid = req.user?.uid;
    const { refreshToken } = req.cookies;
    res.cookie("refreshToken", "");
    return await userLogout(tokenRepository, utilsService, refreshToken, uid);
  };

  const getInitialUserDataFromRefreshToken = async (req: IRequest) => {
    const { refreshToken } = req.cookies;
    return await getUserFromRefreshToken(userRepository, tokenRepository, jwtService, utilsService, refreshToken);
  };

  const postVerifyEmailWithOtp = async (req: IRequest, res: Response) => {
    const { uid } = req.params;
    const { otp } = req.body;
    const response = await verifyEmail(
      userRepository,
      otpRepository,
      authService,
      tokenRepository,
      jwtService,
      utilsService,
      uid,
      otp
    );
    const currentdate = new Date();
    const next3months = new Date(currentdate.setMonth(currentdate.getMonth() + 3));
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
    return await userVerificationStatus(userRepository, utilsService, typeofVerification, uid);
  };

  const getUserDataPublic = async (req: IRequest) => {
    const { id: userId } = req.params;
    return await getPublicUser(userRepository, followsRepository, utilsService, userId);
  };

  const getDataForCurrentUserDashboard = async (req: IRequest) => {
    const { user } = req;
    return await caseGetFullDetailsOfSingleUser(utilsService, user);
  };

  const postFollowNewUser = async (req: IRequest) => {
    const { uid: uidToFollow } = req.params;
    const { user } = req;
    return await caseAddNewFollow(followsRepository, userRepository, utilsService, user, uidToFollow);
  };

  const getFollowingDataWithSingleUser = async (req: IRequest) => {
    const { user } = req;
    const { uid: uidToCheck } = req.params;
    return await caseGetFollowingStatus(followsRepository, utilsService, user, uidToCheck);
  };

  const deleteUnfollowUser = async (req: IRequest) => {
    const { user } = req;
    const { uid: userIdToUnfollow } = req.params;
    return await caseUnfollowUser(followsRepository, utilsService, user, userIdToUnfollow);
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
