import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/use.entity';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  //   imports: [TypeOrmModule.forFeature([User])],
  // providers: [AuthResolver, AuthService, UsersService],imports: [UsersModule],
  imports: [
    UsersModule,
    JwtModule.register({ signOptions: { expiresIn: '60m' } }),
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
