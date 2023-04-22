import SMTPTransport from "nodemailer/lib/smtp-transport";
export default class emailService {
    private _transport;
    private _accountEmail;
    constructor(AccountEmail: string, password: string);
    sendOtp: (toEmail: string, otp: string) => Promise<SMTPTransport.SentMessageInfo>;
}
