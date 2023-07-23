// public, private, protected, readonly

class Monster5 {
  // power => 생성자에서 public, private, protected, readonly 중 1개라도 있으면 power 선언 생략가능(파이썬이랑 비슷)

  constructor(private readonly power: any) {}

  attack1 = () => {
    console.log("공격!");
    console.log("공격력: " + this.power);
  };
}

class 공중몬스터5 extends Monster5 {
  attack2 = () => {
    console.log("공격!");
    // console.log("공격력: " + this.power);
  };
}

const mymonster55 = new 공중몬스터5(20);
mymonster55.attack1();
// console.log(mymonster55.power);
mymonster55.attack2();
