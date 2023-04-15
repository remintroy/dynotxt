"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAccessToken_1 = __importDefault(require("./verifyAccessToken"));
const getJwt = ({ secret }) => {
    return {
        verifyAssessToken: (0, verifyAccessToken_1.default)({ jwt: jsonwebtoken_1.default, secret }),
    };
};
exports.getJwt = getJwt;
exports.default = exports.getJwt;
//# sourceMappingURL=index.js.map