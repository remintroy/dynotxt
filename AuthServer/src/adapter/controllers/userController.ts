import { Request } from "express";
import IuserRepositoryMongoDB from "../../frameworks/databases/mongoDb/repository/userRepositoryMongoDb";
import IauthServiceImpl from "../../frameworks/services/authServices";
import { normalUserValidatorImpl } from "../../frameworks/services/validator";
import userSignin from "../../application/use-cases/user/signIn";
import tokenRepositoryMongoDB from "../../frameworks/databases/mongoDb/repository/tockensRepositoryMongoDb";

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
    userDbRepository,
    userDbRepositoryImpl: typeof IuserRepositoryMongoDB,
    authServiceInterface,
    authServiceImpl: typeof IauthServiceImpl,
    tokenRepositoryInterface,
    tokenRepositoryImpl: typeof tokenRepositoryMongoDB,
    validator: typeof normalUserValidatorImpl,
    createError,
    emailService
  ) {
    this._authService = authServiceInterface(authServiceImpl());
    this._userRepository = userDbRepository(userDbRepositoryImpl());
    this._tokenRepository = tokenRepositoryInterface(tokenRepositoryImpl());
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

  };
}
