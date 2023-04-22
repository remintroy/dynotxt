"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendOtp_1 = __importDefault(require("./sendOtp"));
class emailService {
    constructor(AccountEmail, password) {
        this.sendOtp = (toEmail, otp) => {
            return (0, sendOtp_1.default)(this._transport, this._accountEmail, toEmail, otp);
        };
        this._accountEmail = AccountEmail;
        this._transport = nodemailer_1.default.createTransport({
            host: "smtp.zoho.in",
            port: 465,
            secure: true,
            auth: {
                user: AccountEmail,
                pass: password,
            },
        });
    }
}
exports.default = emailService;
//# sourceMappingURL=index.js.map