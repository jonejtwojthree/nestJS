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
  console.log(myphone + "번호로 인증번호 " + result + "를 전송");
}
