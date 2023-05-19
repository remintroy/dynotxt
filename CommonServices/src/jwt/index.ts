import jwt from "jsonwebtoken";

interface TokenOptions {
  expiresIn?: string | number;
}

interface ConstructorInput {
  accessTokenSecret: string;
  accessTokenOptions?: TokenOptions;
  refreshTokenSecret?: string;
  refreshTokenOptions?: TokenOptions;
}

/**
 * Makes sets of jwt methords which can be used to easly create and verify jwt tokens.
 * This class requires access token secret + access token options and optionally refresh token secret and its curresponding options
 */
export default class GetJwt {
  private accessTokenSecret: string;
  private accessTokenOptions?: TokenOptions;
  private refreshTokenSecret?: string;
  private refreshTokenOptions?: TokenOptions;

  /**
   * Makes sets of jwt methords which can be used to easly create and verify jwt tokens.
   * This class requires access token secret + access token options and optionally refresh token secret and its curresponding options
   * @param data
   * #### Required parameters in data object
   * * accessTokenSecret
   * * accessTokenOptions
   * #### Optional parameters in data object
   * * refreshTokenSecret
   * * refreshTokenOptions
   */
  constructor(data: ConstructorInput) {
    this.accessTokenSecret = data.accessTokenSecret;
    this.accessTokenOptions = data.accessTokenOptions;
    this.refreshTokenSecret = data?.refreshTokenSecret;
    this.refreshTokenOptions = data?.refreshTokenOptions;
  }

  /**
   * Get data from access token payload and verify the validity of access token
   * @param accessToken Access Token to decode
   * @returns string or jwt payload
   */
  verifyAccessToken(accessToken: string): { email?: string; uid?: string } | any {
    return jwt.verify(accessToken, this.accessTokenSecret);
  }

  /**
   * Generates new access token and signs with access token secret.
   * @param payload Payload object to create access token
   * @returns New access token string
   */
  generateAccessToken(payload: any) {
    return jwt.sign(payload, this.accessTokenSecret, this.accessTokenOptions ?? {});
  }

  /**
   * Get data from refresh token payload and verify refresh token validity
   * @param refreshToken Refresh token to decode
   * @returns
   */
  verifyRefreshToken(refreshToken: string): { email?: string; uid?: string } | any {
    if (!this.refreshTokenSecret) return null;
    return jwt.verify(refreshToken, this.refreshTokenSecret);
  }

  /**
   * Generates new refresh token and signs with refresh token secret
   * @param payload Payload object to create refresh token
   * @returns New refresht token string or null
   */
  generateRefreshToken(payload: any) {
    if (!this.refreshTokenSecret) return null;
    return jwt.sign(payload, this.refreshTokenSecret, this?.refreshTokenOptions ?? {});
  }

  /**
   * Generates both refresh and access tokens.
   * @param payload Payload to generate both tokens
   * @returns new refresh and access tokens with provided payload
   */
  generateTokens(payload: any) {
    if (!this.refreshTokenSecret) return null;

    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }
}
