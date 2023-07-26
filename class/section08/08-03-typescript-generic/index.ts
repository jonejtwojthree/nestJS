// 1. 문자, 숫자, 불린 기본타입
const getPrimitive = (arg1: string, arg2: number, arg3: boolean): [boolean, number, string] => {
  return [arg3, arg2, arg1];
};

const result = getPrimitive("a", 123, true);

// 2. any타입(js와 같음)
const getAny = (arg1: any, arg2: any, arg3: any): [any, any, any] => {
  console.log(arg1 + 100);
  return [arg3, arg2, arg1];
};

const result2 = getPrimitive("a", 123, true);

// 3. unknown타입(뭐가 올지 모름)
const getUnknown = (arg1: unknown, arg2: unknown, arg3: unknown): [unknown, unknown, unknown] => {
  if (typeof arg1 === "number") console.log(arg1 + 100);
  return [arg3, arg2, arg1];
};

const result3 = getUnknown("a", 123, true);

// 4. generic타입 - 1 (any와 확실히 다름, 인자가 들어와도 any는 any이고, generic은 인자가 들어가면 인자타입이 정해짐)
function getGeneric<MyType1, MyType2, MyType3>(arg1: MyType1, arg2: MyType2, arg3: MyType3): [MyType3, MyType2, MyType1] {
  return [arg3, arg2, arg1];
}

const result4 = getGeneric("a", 123, true);

// 4. generic타입 - 2 (인자 타입 미리 명시하기)
function getGeneric2<T1, T2, T3>(arg1: T1, arg2: T2, arg3: T3): [T3, T2, T1] {
  return [arg3, arg2, arg1];
}

const result5 = getGeneric2<number, string, boolean>(123, "a", true);

// 4. generic타입 - 3 (인자 타입 미리 명시하기)
function getGeneric3<T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] {
  return [arg3, arg2, arg1];
}

const result6 = getGeneric3(123, "a", true);
