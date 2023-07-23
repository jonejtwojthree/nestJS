// public, private, protected, readonly

class Monster4 {
  // power => 생성자에서 public, private, protected, readonly 중 1개라도 있으면 power 선언 생략가능(파이썬이랑 비슷)

  constructor(readonly power: any) {}

  attack1 = () => {
    console.log("공격!");
    console.log("공격력: " + this.power);
  };
}

class 공중몬스터4 extends Monster4 {
  attack2 = () => {
    console.log("공격!");
    console.log("공격력: " + this.power);
  };
}

const mymonster44 = new 공중몬스터4(20);
mymonster44.attack1();
console.log(mymonster44.power);
mymonster44.attack2();
