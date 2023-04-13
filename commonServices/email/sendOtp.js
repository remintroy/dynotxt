"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (tarnsport, fromEmail, toEmail, otp) => {
    try {
        const template = `<div style="font-family: Helvetica,Arial,sans-serif;overflow:auto;line-height:2">
    <div style="auto;width:95%; margin: 50px auto;">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Dynotxt</a>
      </div>
      <p style="font-size:1.1em">Hi,</p>
      <p>Thank you for choosing Dynotxt. Use the following OTP to complete your Authentication procedures. OTP is valid for 10 minutes</p>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
      <p style="font-size:0.9em;">Regards,<br />Dynotxt.com</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:left;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>Dynotxt.com</p>
        <p>Kerala, India</p> 
      </div>
    </div>
  </div>`;
        return await tarnsport.sendMail({
            from: fromEmail,
            to: toEmail,
            subject: "OTP for Dynotxt.com",
            html: template,
        });
    }
    catch (e) {
        throw e;
    }
};
//# sourceMappingURL=sendOtp.js.map