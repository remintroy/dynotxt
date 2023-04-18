import nodeMailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
declare const _default: (tarnsport: nodeMailer.Transporter<SMTPTransport.SentMessageInfo>, fromEmail: string, toEmail: string, otp: string) => Promise<SMTPTransport.SentMessageInfo>;
export default _default;
