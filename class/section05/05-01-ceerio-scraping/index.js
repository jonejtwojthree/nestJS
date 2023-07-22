import axios from "axios";
import * as cheerio from "cheerio";

const createMessage = async () => {
  // 1. 입력된 메시지에서 http로 시작하는 문장이 있는지 먼저 찾기
  const url = "https://naver.com";

  // 2. axios.get으로 요청해서 html코드 받아오기 (스크래핑, 크롤링)
  let result = await axios.get(url);
  result = result.data;

  // 3. 스크래핑 결과에서 OG(오픈그래프) 코드를 골라내서 변수에 담기 => cheerio, Puppeteer
  const qqq = cheerio.load(result);
  qqq("meta").each((idx, el) => {
    if (qqq(el).attr("property") && qqq(el).attr("property").includes("og:")) {
      const key = qqq(el).attr("property");
      const value = qqq(el).attr("content");
      console.log(key, value);
    }
  });

  //   const $ = cheerio.load(result);
  //   const ogUrl = $("meta[property='og:url']").attr("content");
  //   console.log(ogUrl);

  //   const ogTitle = $("meta[property='og:title']").attr("content");
  //   console.log(ogTitle);

  //   const ogImage = $("meta[property='og:image']").attr("content");
  //   console.log(ogImage);
};

createMessage();
