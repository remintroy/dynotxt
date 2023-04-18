"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAccessToken_1 = __importDefault(require("./verifyAccessToken"));
const verifyRefreshToken_1 = __importDefault(require("./verifyRefreshToken"));
const createAccessToken_1 = __importDefault(require("./createAccessToken"));
const createRefreshToken_1 = __importDefault(require("./createRefreshToken"));
const getJwt = ({ secret, options }) => {
    return {
        verifyAssessToken: (0, verifyAccessToken_1.default)({ jwt: jsonwebtoken_1.default, secret }),
        verifyRefreshToken: (0, verifyRefreshToken_1.default)({ jwt: jsonwebtoken_1.default, secret }),
        createAccessToken: (0, createAccessToken_1.default)(jsonwebtoken_1.default, secret, options),
        createRefreshToken: (0, createRefreshToken_1.default)(jsonwebtoken_1.default, secret, options),
    };
};
exports.getJwt = getJwt;
exports.default = exports.getJwt;
//# sourceMappingURL=index.js.map