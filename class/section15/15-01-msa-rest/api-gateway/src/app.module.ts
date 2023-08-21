import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        // API 게이트웨이와 서비스를 똑같이 입력
        options: {
          host: 'auth-service',
          port: 3001,
        },
      },
      {
        name: 'RESOURCE_SERVICE',
        transport: Transport.TCP,

        // API 게이트웨이와 서비스를 똑같이 입력
        options: {
          host: 'resource-service',
          port: 3002,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
