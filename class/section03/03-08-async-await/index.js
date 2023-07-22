import axios from "axios";

// 1. 비동기 방식
// async function fetchAsync() {
//   const result = await axios.get("https://koreanjson.com/posts/1");
//   console.log(result.data);
// }

const fetchAsync = async () => {
  const result = await axios.get("https://koreanjson.com/posts/1");
  console.log(result.data);
};

// 2. 동기 방식
// function fetchSync() {
//   const result = axios.get("https://koreanjson.com/posts/1");
//   console.log(result.data);
// }

const fetchSync = () => {
  const result = axios.get("https://koreanjson.com/posts/1");
  console.log(result.data);
};

fetchAsync();
fetchSync();
