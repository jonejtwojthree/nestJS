import coolsms from "coolsms-node-sdk";
import dotenv from "dotenv";

dotenv.config();

const mysms = coolsms.default;

export function checkPhone(myphone) {
  if (myphone.length < 10 || myphone.length > 11) {
    console.log("에러발생");
    return false;
  } else {
    return true;
  }
}

export function getToken() {
  const result = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");
  console.log(result);
  return result;
}

export default function sendTokenToSMS(myphone, result) {
  // apiKey, apiSecret 설정
  const API_KEY = process.env.COOL_SMS_API_KEY;
  const API_SECRET_KEY = process.env.COOL_SMS_API_SECRET_KEY;

  console.log(API_KEY);
  console.log(API_SECRET_KEY);

  const messageService = new mysms(API_KEY, API_SECRET_KEY);

  // 2건 이상의 메시지를 발송할 때는 sendMany, 단일 건 메시지 발송은 sendOne을 이용해야 합니다.
  const res = messageService
    .sendOne(
      {
        to: myphone,
        from: "01047677327",
        text: `[안내] 안녕하세요, 요청하신 인증번호는 ${result}입니다`,
      }
      // 1만건까지 추가 가능
    )
    .then((res) => console.log(res))
    .catch((err) => console.error(err));

  console.log(res);
}
