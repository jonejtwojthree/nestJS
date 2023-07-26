import getToday from "./utils.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export function checkEmail(email) {
  if (email === undefined || email.includes("@") === false) {
    console.log("Error");
    return false;
  }
  return true;
}

export function getWelcomeTemplate({ name, age, school }) {
  const mytemplate = `
    <html>
        <body>
            <h1>${name}님 가입을 환영합니다</h1>
            <hr />
            <div>이름: ${name}</div>
            <div>나이: ${age}</div>
            <div>학교: ${school}</div>
            <div>가입일: ${getToday()}</div>
        </body>
  </html>
    `;

  return mytemplate;
}

export function sendTemplateToEmail(email, result) {
  const fromEmail = process.env.NODEMAILER_EMAIL;
  const fromPasswd = process.env.NODEMAILER_PASSWORD;

  const transporter = nodemailer.createTransport({
    host: "smtp.naver.com",
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: fromEmail,
      pass: fromPasswd,
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: fromEmail, // sender address
      to: email, // list of receivers
      subject: "가입을 축하드립니다.", // Subject line
      text: "Hello world?", // plain text body
      html: result, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //
  }

  main().catch(console.error);
}
