import { Request, Response } from "express";
import { IAdminUser } from "../../frameworks/databases/mongoDb/models/admin.schema";
import adminUserRepositoryImpl from "../../frameworks/databases/mongoDb/repository/adminRepositoryImpl";
import authServiceInterface from "../../application/services/authServices";
import validatorInteraface from "../../application/services/validatorInteraface";
import signinAdmin from "../../application/use-cases/admin/signInAdmin";
import tokenRepositoryInteraface from "../../application/repository/tokensRepositoryInteraface";
import getAdminFromRefreshToken from "../../application/use-cases/admin/adminUserDataFromRefreshToken";

export interface IRequest extends Request {
  user: IAdminUser;
}

const adminController = (
  adminRepository: ReturnType<typeof adminUserRepositoryImpl>,
  tokenRepository: ReturnType<typeof tokenRepositoryInteraface>,
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

  return {
    signInAdminUser,
    getAdminUserData,
  };
};

export default adminController;
