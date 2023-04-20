"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (tarnsport, fromEmail, toEmail, otp) => {
    try {
        const template = ` 
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

        body {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 100px;
            margin-bottom: 100px;
            background-color: rgb(235, 235, 235);
            box-sizing: border-box;
            padding: 20px;
            font-family: 'Poppins', sans-serif;
        }

        .content {
            box-sizing: border-box;
            padding: 50px;
            width: 100%;
            height: 100%;
            background-color: white;
            border: 1px solid rgb(185, 185, 185);
            border-radius: 4px;
            max-width: 500px;
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
        <h1>Verification code</h1>
        <p>Please use the code below to verify you email with <b>dynotxt.com</b></p>
        <h2>${otp}</h2>
        <p>If you <b>didn’t request</b> this, you can ignore this email.</p>
        <div class="align-left">
            <b> Thanks, <br>
                Dynotxt support &hearts;
            </b>
        </div>
    </div>
</body>

</html>`;
        return await tarnsport.sendMail({
            from: `"Dynotxt Team" <${fromEmail}>`,
            to: toEmail,
            subject: "Verification code for dynotxt",
            html: template,
        });
    }
    catch (e) {
        throw e;
    }
};
//# sourceMappingURL=sendOtp.js.map