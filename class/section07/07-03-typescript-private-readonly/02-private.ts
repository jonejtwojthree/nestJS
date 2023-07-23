// public, private, protected, readonly

class Monster2 {
  // power => 생성자에서 public, private, protected, readonly 중 1개라도 있으면 power 선언 생략가능(파이썬이랑 비슷)

  constructor(private power: any) {}

  attack1 = () => {
    console.log("공격!");
    console.log("공격력: " + this.power);
  };
}

class 공중몬스터2 extends Monster2 {
  attack2 = () => {
    console.log("공격!");
    // console.log("공격력: " + this.power);
  };
}

const mymonster22 = new 공중몬스터2(20);
mymonster22.attack1();
// console.log(mymonster22.power);
mymonster22.attack2();
