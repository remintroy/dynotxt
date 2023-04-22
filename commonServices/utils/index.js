"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createError_1 = __importDefault(require("./createError"));
class utilService {
    constructor() {
        this.createError = (code, error, optionalData) => (0, createError_1.default)(code, error, optionalData);
    }
}
exports.default = utilService;
//# sourceMappingURL=index.js.map