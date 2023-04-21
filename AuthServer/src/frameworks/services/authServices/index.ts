import * as firebase from "./firebase";
import jwt from "./jwt";

export default class authServiceImpl {
  private _adminJwt: typeof jwt.adminJwt;
  private _userJwt: typeof jwt.userJwt;

  constructor() {
    this._adminJwt = jwt.adminJwt;
    this._userJwt = jwt.userJwt;
  }

  verifyIdToken = (idToken: string) => firebase.verifyIdToken(idToken);
  createOtp = async (uid: string, reason: string) => "67F24G";
  tokensForUser = (uid: string) => {
    return {
      accessToken: this._userJwt.createAccessToken({ uid: uid }),
      refreshTOken: this._userJwt.createRefreshToken({ uid: uid }),
    };
  };
}
