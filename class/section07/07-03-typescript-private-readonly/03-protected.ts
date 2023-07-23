// public, private, protected, readonly

class Monster3 {
  // power => 생성자에서 public, private, protected, readonly 중 1개라도 있으면 power 선언 생략가능(파이썬이랑 비슷)

  constructor(protected power: any) {}

  attack1 = () => {
    console.log("공격!");
    console.log("공격력: " + this.power);
  };
}

class 공중몬스터3 extends Monster3 {
  attack2 = () => {
    console.log("공격!");
    console.log("공격력: " + this.power);
  };
}

const mymonster33 = new 공중몬스터3(20);
mymonster33.attack1();
//console.log(mymonster33.power);
mymonster33.attack2();
