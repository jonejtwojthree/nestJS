import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DummyController, jwjwCtl } from './dummy.controller';
import { bppService, dmyService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, DummyController, jwjwCtl],
  providers: [bppService, dmyService, dmyService],
})
export class AppModule {}
