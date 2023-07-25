import { Injectable, Scope } from '@nestjs/common';

// request 스코프(매 요청마다 new)
// transient 스코프(매 주입마다 new)
@Injectable({ scope: Scope.DEFAULT }) // 인젝션-스코프 => 싱글톤 1번할래?(디폴트는 싱글톤)
export class BoardsService {
  qqq(): string {
    return 'Hello World!';
  }
}
