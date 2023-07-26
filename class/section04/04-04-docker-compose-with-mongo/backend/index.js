// express export default로 선언했기 때문에 {}안에 선언할 필요가 없음
import express from "express";
import {
  checkEmail,
  getWelcomeTemplate,
  sendTemplateToEmail,
} from "./email.js";

import { checkPhone, getToken } from "./phone.js";

// sendTokenToSMS는 export default로 선언했기 때문에 {}안에 선언할 필요가 없음
import sendTokenToSMS from "./phone.js";
// default로 선언해서 qwer로 선언해도 알아서 sendTokenToSMS로 바낌
// import qwer from "./phone.js";

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";

//////////////////////////// 초기설정 /////////////////////////////////////

const app = express();
app.use(express.json());
const swaggerSpec = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
////////////////////////////////////////////////////////////////////////////////

app.get("/boards", function (req, res) {
  // 1. db에 접속 후, 데이터를 조회 => 데이터를 조회했다고 가정
  const result = [
    { number: 1, writer: "철수", title: "제목ㅇㄹㄴㄹ" },
    { number: 2, writer: "철이", title: "ㅂㅈㄷㅂㄷㅇㄹㄴㄹ" },
    { number: 3, writer: "수철", title: "ㅠㅊ퓿퓨ㄹ" },
  ];
  // 2. DB에서 꺼내온 결과를 브라우저에 응답(response)주기
  res.send(result);
});

app.post("/boards", function (req, res) {
  // 1. 브라우저에서 보내준 데이터 확인하기
  console.log(typeof req);
  console.log("============================");
  console.log(typeof res);
  console.log("============================");
  console.log(req.body);

  // 2. DB에 접속 후, 데이터를 저장 => 데이터 저장했다고 가정

  // 3. DB에 저장된 결과를 브라우저에 응답(response)주기
  res.send("게시물 등록에 성공하였음");
});

app.post("/tokens/phone", function (req, res) {
  const myphone = req.body.phone;

  console.log(myphone);

  const isValid = checkPhone(myphone);
  if (isValid == false) return;

  const mytoken = getToken();

  sendTokenToSMS(myphone, mytoken);

  res.send("인증완료!!!");
});

app.post("/users", function (req, res) {
  // const name = req.body.name;
  // const age = req.body.age;
  // const school = req.body.school;
  // const email = req.body.email;

  const { email, name, age, school } = req.body;

  // 1. 이메일 정상인지 확인
  const isValid = checkEmail(email);
  if (isValid == false) return;

  // 2. 가입환영 템플릿 만들기
  const myTemplate = getWelcomeTemplate({ name, age, school });

  // 3. 이메일에 가입환영 템플릿 전송하기
  sendTemplateToEmail(email, myTemplate);

  res.send("회원가입 완료");
});

app.listen(4000);
