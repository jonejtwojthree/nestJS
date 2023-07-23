// public, private, protected, readonly

class Monster {
  // power => 생성자에서 public, private, protected, readonly 중 1개라도 있으면 power 선언 생략가능(파이썬이랑 비슷)

  constructor(public power: any) {}

  attack1 = () => {
    console.log("공격!");
    console.log("공격력: " + this.power);
  };
}

class 공중몬스터 extends Monster {
  attack2 = () => {
    console.log("공격!");
    console.log("공격력: " + this.power);
  };
}

const mymonster11 = new 공중몬스터(20);
mymonster11.attack1();
console.log(mymonster11.power);
mymonster11.attack2();
