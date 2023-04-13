"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createError_1 = __importDefault(require("./createError"));
describe("Utils", () => {
    //
    it("CreateError Normal case", () => {
        expect((0, createError_1.default)(201, "Sample Error")).toEqual({
            code: 201,
            message: "Created",
            error: "Sample Error",
        });
    });
    it("CreateError With extra arguments", () => {
        expect((0, createError_1.default)(201, "Sample Error", { extra: "data" })).toEqual({
            code: 201,
            message: "Created",
            error: "Sample Error",
            extra: "data",
        });
    });
    it("CreateError With extra Null arguments", () => {
        expect((0, createError_1.default)(201, "Sample Error", null)).toEqual({
            code: 201,
            message: "Created",
            error: "Sample Error",
        });
    });
    it("CreateError Unexpected input", () => {
        const notExpectedInput = "asd";
        expect((0, createError_1.default)(notExpectedInput, "")).toEqual({
            code: 500,
            message: "Internal Server Error",
            error: "Oops thats an error",
        });
    });
});
//# sourceMappingURL=createError.test.js.map