import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// The GraphQL schema
const typeDefs = `#graphql
  # 나만의 객체 생성
  type MyResult{
    number: Int,
    writer: String,
    title: String,
    contents: String
  }

  # 인풋타입은 input으로 사용, Mutation의 createBoard의 인풋값이니깐
  input CreateBoardInput{
    writer: String,
    title: String,
    contents: String
  }

###################################################################

  type Query {
    fetchBoard: [MyResult] # 배열안에 객체 1개 이상을 의미
  }

  # 필수입력('!')
  type Mutation{
    # createBoard(write: String, title: String, contents: String!): String,
    createBoard(createBoardInput: CreateBoardInput!): String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    // (parent, args, context, info) 매개변수는 디폴트
    fetchBoard: (parent, args, context, info) => {
      const result = [
        { number: 1, writer: "철수", title: "제목ㅇㄹㄴㄹ", contents: "노잼" },
        {
          number: 2,
          writer: "철이",
          title: "ㅂㅈㄷㅂㄷㅇㄹㄴㄹ",
          contents: "꿀잼",
        },
        { number: 3, writer: "수철", title: "ㅠㅊ퓿퓨ㄹ", contents: "허니잼" },
      ];

      return result;
    },
  },

  Mutation: {
    createBoard: (_, args) => {
      // 1. 브라우저에서 보내준 데이터 확인하기
      console.log(args);
      console.log(args.createBoardInput.writer);
      console.log(args.createBoardInput.title);
      console.log(args.createBoardInput.contents);

      // 2. DB에 접속 후, 데이터를 저장 => 데이터 저장했다고 가정

      // 3. DB에 저장된 결과를 브라우저에 응답(response)주기
      return "게시물 등록에 성공하셨습니다.";
    },
  },
};

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers,
  cors: true,
});
const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);
