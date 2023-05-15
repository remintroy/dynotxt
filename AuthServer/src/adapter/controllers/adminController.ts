import { Request, Response } from "express";
import { IAdminUser } from "../../frameworks/databases/mongoDb/models/admin.schema";
import adminUserRepositoryImpl from "../../frameworks/databases/mongoDb/repository/adminRepositoryImpl";
import authServiceInterface from "../../application/services/authServices";
import validatorInteraface from "../../application/services/validatorInteraface";
import signinAdmin from "../../application/use-cases/admin/signInAdmin";
import tokenRepositoryInteraface from "../../application/repository/tokensRepositoryInteraface";
import getAdminFromRefreshToken from "../../application/use-cases/admin/admin-user-data-from-refresh-token";
import userRepositoryInteraface from "../../application/repository/userRepositoryInteraface";
import getAllUserforAdmin from "../../application/use-cases/admin/get-all-User";
import disableUser from "../../application/use-cases/admin/disable-user";
import enableUser from "../../application/use-cases/admin/enable-user";
import getBlockedUsers from "../../application/use-cases/admin/get-blocked-users";
import logoutAdmin from "../../application/use-cases/admin/logoutAdmin";
import refreshAdmin from "../../application/use-cases/admin/refresh-access-token";

export interface IRequest extends Request {
  admin: IAdminUser;
}

const adminController = (
  adminRepository: ReturnType<typeof adminUserRepositoryImpl>,
  tokenRepository: ReturnType<typeof tokenRepositoryInteraface>,
  userRepository: ReturnType<typeof userRepositoryInteraface>,
  authService: ReturnType<typeof authServiceInterface>,
  validator: ReturnType<typeof validatorInteraface>,
  createError
) => {
  const signInAdminUser = async (req: IRequest, res: Response) => {
    const { email, password } = req.body;
    const response = await signinAdmin(
      adminRepository,
      tokenRepository,
      authService,
      validator,
      createError,
      email,
      password
    );
    const currentdate = new Date();
    const next3months = new Date(
      currentdate.setMonth(currentdate.getMonth() + 3)
    );
    res.cookie("suRefreshToken", response.refreshToken, {
      httpOnly: true,
      secure: true,
      expires: next3months,
    });
    response.refreshToken = null;
    return response;
  };

  const getAdminUserData = async (req: IRequest) => {
    const refreshToken = req.cookies.suRefreshToken;
    const response = await getAdminFromRefreshToken(
      adminRepository,
      validator,
      tokenRepository,
      authService,
      createError,
      refreshToken
    );
    return response;
  };

  const getAdminAllUserDataAsPage = async (req: IRequest) => {
    const pageNo = req.query.page;
    const response = await getAllUserforAdmin(
      userRepository,
      createError,
      pageNo
    );
    return response;
  };

  const putAdminChangeUserState = async (req: IRequest) => {
    const { action, uid } = req.params;
    const response =
      action === "enable"
        ? await enableUser(userRepository, createError, uid)
        : await disableUser(userRepository, createError, uid);
    return response;
  };

  const getAdminAllBlockedUsers = async (req: IRequest) => {
    const pageNo = req.query.page;
    const response = await getBlockedUsers(userRepository, createError, pageNo);
    return response;
  };

  const getAdminLogout = async (req: IRequest, res: Response) => {
    const refreshToken = req.cookies.suRefreshToken;
    const { email } = req.admin;
    const response = await logoutAdmin(
      tokenRepository,
      createError,
      refreshToken,
      email
    );
    res.cookie("suRefreshToken", "");
    return response;
  };

  const getNewAccessTokenFromRefreshToken = async (req: IRequest) => {
    const { suRefreshToken } = req.cookies;
    const response = await refreshAdmin(
      tokenRepository,
      adminRepository,
      authService,
      validator,
      createError,
      suRefreshToken
    );
    return response;
  };

  return {
    signInAdminUser,
    getAdminUserData,
    getAdminAllUserDataAsPage,
    putAdminChangeUserState,
    getAdminAllBlockedUsers,
    getAdminLogout,
    getNewAccessTokenFromRefreshToken,
  };
};

export default adminController;
