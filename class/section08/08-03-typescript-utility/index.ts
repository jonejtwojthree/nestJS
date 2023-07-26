interface IProfile {
  name: string;
  age: number;
  school: string;
  hobby?: string;
}

// 1. Partial 타입(모든 키 물음표)
type aaa = Partial<IProfile>;

// 2. required 타입(모든 키 필수)
type bbb = Required<IProfile>;

// 3. Pick 타입(key중에 추출)
type ccc = Pick<IProfile, "name" | "age">;

// 4. Omit 타입(key중에 빼버림)
type ddd = Omit<IProfile, "name" | "age">;

// 5. Record 타입

type eee = "철수" | "영희" | 3; // Union(들어갈 변수 값 정의)
let child1: eee = "철수"; // 철수, 영희, 훈이만 됨
// let child1: eee = "asdasdasdasd"; // 철수, 영희, 훈이만 됨( error)
let child2: string = "asdasdasdasd"; // 철수, 영희, 훈이만 됨

type fff = Record<eee, IProfile>; // 키는 철수, 영희, 3 값은 IProfile

// 6. 객체의 key들로 Union 타입 만들기
type ggg = keyof IProfile;
let myprofile: ggg = "hobby"; // name, age, school, hobby 중 1개

// 7. type && interface차이

// 선언병합으로 키 추가
interface IProfile {
  candy: number;
}
