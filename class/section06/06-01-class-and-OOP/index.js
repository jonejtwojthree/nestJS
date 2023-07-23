const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;

console.log(typeof date);
console.log(year);
console.log(month);

console.log("==========================================================");

class Monster {
  // let, const등 사용 금지(this 생략됨)
  power = 10;

  constructor(zzz) {
    this.power = zzz;
  }
  attack() {
    // 인스턴스 변수를 사용하려면 무조건 this사용(안하면 에러)
    console.log("공격: " + this.power);
  }

  run = () => {
    console.log("튀어");
  };
}

qqq = 100;
const monster = new Monster(qqq);
monster.attack();
monster.run();
