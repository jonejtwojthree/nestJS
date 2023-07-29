import { Injectable, Scope } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { IBoardsServiceCreate } from './interfaces/boards-service.interface';

// request 스코프(매 요청마다 new)
// transient 스코프(매 주입마다 new)
@Injectable({ scope: Scope.DEFAULT }) // 인젝션-스코프 => 싱글톤 1번할래?(디폴트는 싱글톤)
export class BoardsService {
  findAll(): Board[] {
    const result = [
      { number: 1, writer: '철수', title: '제목ㅇㄹㄴㄹ', contents: '노잼' },
      {
        number: 2,
        writer: '철이',
        title: 'ㅂㅈㄷㅂㄷㅇㄹㄴㄹ',
        contents: '꿀잼',
      },
      { number: 3, writer: '수철', title: 'ㅠㅊ퓿퓨ㄹ', contents: '허니잼' },
    ];

    return result;
  }

  create({ createBoardInput }: IBoardsServiceCreate): string {
    // 1. 브라우저에서 보내준 데이터 확인하기
    console.log(createBoardInput.writer);
    console.log(createBoardInput.title);
    console.log(createBoardInput.contents);

    // 2. DB에 접속 후, 데이터를 저장 => 데이터 저장했다고 가정

    // 3. DB에 저장된 결과를 브라우저에 응답(response)주기
    return '게시물 등록에 성공하셨습니다.';
  }
}
