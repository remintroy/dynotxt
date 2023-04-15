"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUtils = void 0;
const createError_1 = __importDefault(require("./createError"));
const getUtils = () => {
    return {
        createError: createError_1.default,
    };
};
exports.getUtils = getUtils;
exports.default = exports.getUtils;
//# sourceMappingURL=index.js.map