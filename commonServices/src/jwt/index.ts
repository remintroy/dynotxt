import jwt from "jsonwebtoken";
import createVerifyAccessToken from "./verifyAccessToken";
import createVerifyRefreshToken from "./verifyRefreshToken";
import createCreateAccessToken from "./createAccessToken";
import createCreateRefreshToken from "./createRefreshToken";

interface IOptions {
  expiresIn?: string | number;
}

export default class jwtService {
  private _accessSecret: string;
  private _refreshSecret: string;
  private _accessOptions: IOptions;
  private _refreshOptions: IOptions;

  constructor({
    refreshSecret,
    accessSecret,
    accessOptions,
    refreshOptions,
  }: {
    refreshSecret: string;
    accessSecret: string;
    accessOptions?: IOptions;
    refreshOptions?: IOptions;
  }) {
    this._accessSecret = accessSecret;
    this._refreshSecret = refreshSecret;
    this._accessOptions = accessOptions;
    this._refreshOptions = refreshOptions;
  }

  verifyAssessToken = (token: string) => createVerifyAccessToken({ jwt, secret: this._accessSecret })(token);
  verifyRefreshToken = (token: string) => createVerifyRefreshToken({ jwt, secret: this._refreshSecret })(token);
  createAccessToken = (payload: object) => createCreateAccessToken(jwt, this._accessSecret, this._accessOptions)(payload);
  createRefreshToken = (payload: object) =>
    createCreateRefreshToken(jwt, this._refreshSecret, this._refreshOptions)(payload);
}
