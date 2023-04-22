interface IOptions {
    expiresIn?: string | number;
}
export default class jwtService {
    private _accessSecret;
    private _refreshSecret;
    private _accessOptions;
    private _refreshOptions;
    constructor({ refreshSecret, accessSecret, accessOptions, refreshOptions, }: {
        refreshSecret: string;
        accessSecret: string;
        accessOptions?: IOptions;
        refreshOptions?: IOptions;
    });
    verifyAssessToken: (token: string) => any;
    verifyRefreshToken: (token: string) => any;
    createAccessToken: (payload: object) => any;
    createRefreshToken: (payload: object) => any;
}
export {};
