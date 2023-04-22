import nodeMailer from "nodemailer";
import sendOtp from "./sendOtp";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export default class emailService {
  private _transport: nodeMailer.Transporter<SMTPTransport.SentMessageInfo>;
  private _accountEmail: string;

  constructor(AccountEmail: string, password: string) {
    this._accountEmail = AccountEmail;
    this._transport = nodeMailer.createTransport({
      host: "smtp.zoho.in",
      port: 465,
      secure: true,
      auth: {
        user: AccountEmail,
        pass: password,
      },
    });
  }

  sendOtp = (toEmail: string, otp: string) => {
    return sendOtp(this._transport, this._accountEmail, toEmail, otp);
  };
}
