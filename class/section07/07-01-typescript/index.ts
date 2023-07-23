// 문자타입 - 타입추론
let aaa = "안녕하세요";
aaa = "반갑습니다";
// aaa = 3; //  다른 타입을 넣게되면 에러 발생!

// 문자타입 - 타입명시
let bbb: string = "반갑습니다.";
bbb = "반가워요!!";
// bbb = 10; // 숫자 타입 불가능!

//////////////////////////////////////////////////////////////////////////////////////////

// 타입 명시가 필요한 상황
let ccc: string | number = 1000;
ccc = "1000원";

//////////////////////////////////////////////////////////////////////////////////////////

// 숫자타입(int타입 없음, double 타입 없음)
let ddd: number = 10;
// ddd = "안녕하세요!!"; // 문자 타입 불가능!
// ddd = "33"; // 문자 타입 불가능!

//////////////////////////////////////////////////////////////////////////////////////////

// 불린타입
let eee: boolean = true;
// eee = 11; // 숫자 타입 불가능!
eee = false;
// eee = "false"; // true로 작동함

//////////////////////////////////////////////////////////////////////////////////////////

let arr1: number[] = [1, 2, 3];
let arr2: Array<number> = [1, 2, 3];

// 배열타입
let fff: number[] = [1, 2, 3, 4, 5];
// fff = ["철수", "영희", "훈이"] // 문자 타입 불가능!

let ggg: string[] = ["철수", "영희", "훈이"];

let hhh: (number | string)[] = ["철수", "영희", "훈이", 10]; // 타입을 추론해서 어떤 타입을 사용하는지 알아보기!!

let mymoney: number[] | string[] = [1000, 2000, 3000];
mymoney = ["1000원", "2000원", "3000원"];

//////////////////////////////////////////////////////////////////////////////////////////

// 객체타입
interface IProfile1 {
  name: string;
  age: number | string;
  school: string;
}

let profile1: IProfile1 = {
  name: "철수",
  age: 13,
  school: "다람쥐초등학교",
};
profile1.age = "13살";

//////////////////////////////////////////////////////////////////////////////////////////

// 객체타입
interface IProfile2 {
  name: string;
  age: number | string;
  school: string;
  hobby?: string; // 있어도, 없어도 되는것은 ? 표시
}
let profile2: IProfile2 = {
  name: "철수",
  age: 8,
  school: "다람쥐초등학교",
};
profile2.age = "8살";
profile2.hobby = "수영";

//////////////////////////////////////////////////////////////////////////////////////////

// 함수 타입, 함수는 타입 추론이 되지 않음!!!!!!!!!
const result1 = function add(num1: number, num2: number, unit: string): string {
  return num1 + num2 + unit;
};

const result2 = (num1: number, num2: number, unit: string): string => {
  return num1 + num2 + unit;
};
