import nodeMailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export default async (
  tarnsport: nodeMailer.Transporter<SMTPTransport.SentMessageInfo>,
  fromEmail: string,
  toEmail: string
) => {
  const template = `<!DOCTYPE html>
    <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
    @import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

    body {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 100px;
        margin-bottom: 100px;
        background-color: rgb(243, 243, 243);
        box-sizing: border-box;
        padding: 20px;
        font-family: "Poppins", sans-serif;
    }
    
      .content {
          box-sizing: border-box;
          padding: 50px;
          width: 100%;
          height: 100%;
          background-color: white;
          border: 1px solid rgb(185, 185, 185);
          border-radius: 4px; 
        }

      .content h1 {
        margin-top: 0;
        font-size: 40px;
      }

      .content img.logo {
        width: 100px;
        filter: invert(100%);
    }
    </style>
    </head>
    
    <body>
    <div class="content">
      <h1>Welcome to dynotxt</h1>
      <p>Hi, <b>${toEmail}</b> its a pleaure see you here</p>
      <p>
      This email is to inform you that you account is successfully created with dynotxt. Now you can enjoy and learn
      reading blogs and articles from the topics you love
      </p>
      <div class="align-left">
      <b>
      Thanks, <br />
      Dynotxt team &hearts;
        </b>
        </div>
        </div>
        </body>
        </html>`;

  return await tarnsport.sendMail({
    from: `"Dynotxt Team" <${fromEmail}>`,
    to: toEmail,
    subject: "Welcome to dynotxt",
    html: template,
  });
};
