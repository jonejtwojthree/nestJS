import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
@Module({
  //   imports: [TypeOrmModule.forFeature([User])],
  // providers: [AuthResolver, AuthService, UsersService],imports: [UsersModule],
  imports: [
    UsersModule,
    JwtModule.register({ signOptions: { expiresIn: '60m' } }),
  ],
  providers: [JwtAccessStrategy, AuthResolver, AuthService, JwtRefreshStrategy],
})
export class AuthModule {}
