import { Request, Response } from "express";
import { AdminUser } from "../../frameworks/databases/mongoDb/models/admin.schema";
import adminUserRepositoryImpl from "../../frameworks/databases/mongoDb/repository/adminRepositoryImpl";
import authServiceInterface from "../../application/services/authServices";
import validatorInteraface from "../../application/services/validatorInteraface";
import signinAdmin from "../../application/use-cases/admin/admin-signin";
import tokenRepositoryInteraface from "../../application/repository/tokensRepositoryInteraface";
import getAdminFromRefreshToken from "../../application/use-cases/admin/admin-data-from-refresh-token";
import userRepositoryInteraface from "../../application/repository/userRepositoryInteraface";
import getAllUserforAdmin from "../../application/use-cases/admin/user-get-all";
import disableUser from "../../application/use-cases/admin/user-disable-byid";
import enableUser from "../../application/use-cases/admin/user-enable-byid";
import getBlockedUsers from "../../application/use-cases/admin/user-get-blocked";
import logoutAdmin from "../../application/use-cases/admin/admin-logout";
import refreshAdmin from "../../application/use-cases/admin/admin-new-access-token";
import GetUtils from "dynotxt-common-services/build/utils";
import GetJwt from "dynotxt-common-services/build/jwt";

export interface IRequest extends Request {
  admin: AdminUser;
}

const adminController = (
  adminRepository: adminUserRepositoryImpl,
  tokenRepository: tokenRepositoryInteraface,
  userRepository: userRepositoryInteraface,
  authService: authServiceInterface,
  validator: validatorInteraface,
  utilsService: GetUtils,
  jwtService: GetJwt
) => {
  //
  const postAdminSignin = async (req: IRequest, res: Response) => {
    const { email, password } = req.body;
    const response = await signinAdmin(
      adminRepository,
      tokenRepository,
      authService,
      validator,
      jwtService,
      utilsService,
      email,
      password
    );
    const currentdate = new Date();
    const next3months = new Date(currentdate.setMonth(currentdate.getMonth() + 3));
    res.cookie("suRefreshToken", response.refreshToken, {
      httpOnly: true,
      secure: true,
      expires: next3months,
    });
    response.refreshToken = null;
    return response;
  };

  const getAdminDataFromRefreshToken = async (req: IRequest) => {
    const refreshToken = req.cookies.suRefreshToken;
    return await getAdminFromRefreshToken(adminRepository, tokenRepository, jwtService, utilsService, refreshToken);
  };

  const getUsersDataPagewise = async (req: IRequest) => {
    const pageNo = Number(req.query.page) || 1;
    return await getAllUserforAdmin(userRepository, utilsService, pageNo);
  };

  const putUserChangeState = async (req: IRequest) => {
    const { action, uid } = req.params;
    return action === "enable"
      ? await enableUser(userRepository, utilsService, uid)
      : await disableUser(userRepository, utilsService, uid);
  };

  const getUsersAllBlocked = async (req: IRequest) => {
    const pageNo = Number(req.query.page) || 1;
    return await getBlockedUsers(userRepository, utilsService, pageNo);
  };

  const getAdminLogout = async (req: IRequest, res: Response) => {
    const refreshToken = req.cookies?.suRefreshToken;
    const { email } = req.admin;
    res.cookie("suRefreshToken", "");
    return await logoutAdmin(tokenRepository, utilsService, refreshToken, email);
  };

  const getNewAccessTokenFromRefreshToken = async (req: IRequest) => {
    const { suRefreshToken } = req.cookies;
    return await refreshAdmin(tokenRepository, adminRepository, jwtService, utilsService, suRefreshToken);
  };

  return {
    postAdminSignin,
    getAdminDataFromRefreshToken,
    getUsersDataPagewise,
    putUserChangeState,
    getUsersAllBlocked,
    getAdminLogout,
    getNewAccessTokenFromRefreshToken,
  };
};

export default adminController;
