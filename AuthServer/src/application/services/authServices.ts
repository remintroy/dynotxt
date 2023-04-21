import authServiceImpl from "../../frameworks/services/authServices";

export default class authServiceInterface {
  private _authService: authServiceImpl;

  constructor(authService: authServiceImpl) {
    this._authService = authService;
  }

  verifyIdToken = (token: string) => this._authService.verifyIdToken(token);
  createOtp = (uid: string, reason: string) => this._authService.createOtp(uid, reason);
  tokensForUser = (uid: string) => this._authService.tokensForUser(uid);
}
