import nodeMailer from "nodemailer";
import sendOtp from "./sendOtp";

export default (AccountEmail: string, password: string) => {
  // creates a reusable transport instance
  const transport = nodeMailer.createTransport({
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
    sendOtp: async (toEmail: string, otp: string) => {
      try {
        await sendOtp(transport, AccountEmail, toEmail, otp);
      } catch (error) {
        throw error;
      }
    },
  };
};
