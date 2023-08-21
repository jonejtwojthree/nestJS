function resolve(aaa) {
  console.log(aaa);
}

// await가 3개
const fetchData = async () => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("성공2");
    }, 2000);
  });

  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("성공3");
    }, 3000);
  });

  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("성공1");
    }, 1000);
  });
};

fetchData();

// await가 1개
const fetchData2 = async () => {
  const result3 = await Promise.all([
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("성공2");
      }, 2000);
    }),

    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("성공3");
      }, 3000);
    }),

    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("성공1");
      }, 1000);
    }),
  ]);

  console.log(result3);
};

fetchData2();
