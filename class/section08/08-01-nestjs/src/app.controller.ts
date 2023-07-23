import { Controller, Get } from '@nestjs/common';
import { bppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: bppService) {}

  @Get('/app')
  getHello(): string {
    return this.appService.qqq();
  }
}
