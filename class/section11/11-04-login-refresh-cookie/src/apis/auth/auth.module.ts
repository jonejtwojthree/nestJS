import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
@Module({
  //   imports: [TypeOrmModule.forFeature([User])],
  // providers: [AuthResolver, AuthService, UsersService],imports: [UsersModule],
  imports: [UsersModule, JwtModule.register({})],
  providers: [JwtAccessStrategy, AuthResolver, AuthService],
})
export class AuthModule {}
