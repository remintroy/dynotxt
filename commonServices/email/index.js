"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendOtp_1 = __importDefault(require("./sendOtp"));
exports.default = (AccountEmail, password) => {
    // creates a reusable transport instance
    const transport = nodemailer_1.default.createTransport({
        host: "smtp.zoho.in",
        port: 465,
        secure: true,
        auth: {
            user: AccountEmail,
            pass: password,
        },
    });
    // reutrns available functions
    return {
        // Sends otp to user with default otp template for authentication
        sendOtp: async (toEmail, otp) => {
            try {
                await (0, sendOtp_1.default)(transport, AccountEmail, toEmail, otp);
            }
            catch (error) {
                throw error;
            }
        },
    };
};
//# sourceMappingURL=index.js.map