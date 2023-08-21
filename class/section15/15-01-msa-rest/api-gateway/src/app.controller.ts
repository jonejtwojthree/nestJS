import { Controller, Post, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
// import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly clientAuthSerivice: ClientProxy,

    @Inject('RESOURCE_SERVICE')
    private readonly clientResourceService: ClientProxy,
  ) {}

  @Post('/logout')
  login() {
    // Auth-service로 트레픽 넘겨줌
    return this.clientAuthSerivice.send(
      { cmd: 'login' },
      { email: 'a@a.com', password: '1234' },
    );
  }

  @Get('/boards')
  fetchBoard() {
    // resiyrce-service로 트레픽 넘겨줌
    return this.clientResourceService.send({ cmd: 'fetchBoards' }, {});
  }
}
