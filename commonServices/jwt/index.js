"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAccessToken_1 = __importDefault(require("./verifyAccessToken"));
const verifyRefreshToken_1 = __importDefault(require("./verifyRefreshToken"));
const createAccessToken_1 = __importDefault(require("./createAccessToken"));
const createRefreshToken_1 = __importDefault(require("./createRefreshToken"));
class jwtService {
    constructor({ refreshSecret, accessSecret, accessOptions, refreshOptions, }) {
        this.verifyAssessToken = (token) => (0, verifyAccessToken_1.default)({ jwt: jsonwebtoken_1.default, secret: this._accessSecret })(token);
        this.verifyRefreshToken = (token) => (0, verifyRefreshToken_1.default)({ jwt: jsonwebtoken_1.default, secret: this._refreshSecret })(token);
        this.createAccessToken = (payload) => (0, createAccessToken_1.default)(jsonwebtoken_1.default, this._accessSecret, this._accessOptions)(payload);
        this.createRefreshToken = (payload) => (0, createRefreshToken_1.default)(jsonwebtoken_1.default, this._refreshSecret, this._refreshOptions)(payload);
        this._accessSecret = accessSecret;
        this._refreshSecret = refreshSecret;
        this._accessOptions = accessOptions;
        this._refreshOptions = refreshOptions;
    }
}
exports.default = jwtService;
//# sourceMappingURL=index.js.map