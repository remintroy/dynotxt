import nodeMailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import sendOtp from "./sendOtp.js";
import welcomeEmail from "./welcomeEmail.js";
import newLogin from "./newLogin.js";

/**
 * This class allows you to access email services and use prebuild templates for quick creation of email.
 * Credentials required for creating an email service is email and passowrd
 */
export default class GetEmail {
  private transport: nodeMailer.Transporter<SMTPTransport.SentMessageInfo>;
  private accountEmail: string;

  /**
   * This class allows you to access email services and use prebuild templates for quick creation of email.
   * Credentials required for creating an email service is email and passowrd
   * @param accountEmail Email id of your email account. Which is used to send email to all users
   * @param accountPassword Passowrd for your email account
   */
  constructor(accountEmail: string, accountPassword: string) {
    // creates a new instance will transport initialized which is required to send email
    this.accountEmail = accountEmail?.trim();
    this.transport = nodeMailer.createTransport({
      host: "smtp.zoho.in",
      port: 465,
      secure: true,
      auth: {
        user: accountEmail,
        pass: accountPassword,
      },
    });
  }

  /**
   * This function allows to send email with custom template
   * @param toEmail Email to send mail
   * @param Options Subject and html template for email. Both are required
   */
  async sendEmailWithCustomTemplate(toEmail: string, { subject, html }) {
    await this.transport.sendMail({
      from: `"Dynotxt Team" <${this.accountEmail}>`,
      to: toEmail,
      subject,
      html,
    });
  }

  /**
   * Send email with default opt template
   * @param toEmail Email which get the opt email
   * @param otp Opt string to send in email
   * @returns Promise with smpt email status
   */
  sendOtpWithCommonTemplate(toEmail: string, otp: string) {
    return sendOtp(this.transport, this.accountEmail, toEmail, otp);
  }

  /**
   * Send email with welcome email for new account
   * @param toEmail Email to send mail
   * @returns Promise with smpt email status
   */
  sendWelcomeEmail(toEmail: string) {
    return welcomeEmail(this.transport, this.accountEmail, toEmail);
  }

  /**
   * Send email with new device login info/warning
   * @param toEmail Email to send mail
   * @returns Promise with smpt email status
   */
  sendNewLoginAlert(toEmail: string) {
    return newLogin(this.transport, this.accountEmail, toEmail);
  }
}
