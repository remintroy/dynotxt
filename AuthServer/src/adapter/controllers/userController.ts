import { Request } from "express";
import IauthServiceImpl from "../../frameworks/services/authServices";
import userSignin from "../../application/use-cases/user/signIn";
import normalUserValidator from "../../application/services/normalUserValidator";
import useDbrRepository from "../../application/repository/userDbRepository";
import tokenDbRepository from "../../application/repository/tokensDbRepository";
import authService from "../../application/services/authServices";

interface IRequest extends Request {
  user: string;
}

export default class userController {
  private _authService: any;
  private _userRepository: any;
  private _tokenRepository: any;
  private _validator: any;
  private _createError: any;
  private _emailService: any;

  constructor(
    userDbRepository: useDbrRepository,
    tokernDbRepository: tokenDbRepository,
    authService: authService,
    validator: normalUserValidator,
    createError,
    emailService
  ) {
    this._authService = authService;
    this._userRepository = userDbRepository;
    this._tokenRepository = tokernDbRepository;
    this._validator = validator;
    this._createError = createError;
    this._emailService = emailService;
  }

  userPostSignin = async (req: IRequest) => {
    const idToken = req.body.idToken;
    return await userSignin(
      this._authService,
      this._userRepository,
      this._tokenRepository,
      this._validator,
      this._createError,
      this._emailService,
      idToken
    );
  };

  getUserRefresh = (req: IRequest) => {
    //
  };
}
