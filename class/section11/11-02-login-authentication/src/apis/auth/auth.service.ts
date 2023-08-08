import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
} from './interfaces/auth-service.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: IAuthServiceLogin): Promise<string> {
    // 1. 이메일이 일치하는 유저를 DB에서 찾기
    const user = await this.usersService.findOneByEmail({ email });

    // 2. 일치하는 유저가 없으면 에러 던지기
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');

    // const isAuth = await bcrypt.compare(password, user.password);
    const isAuth = password;

    // 3. 일치하는 유저가 있는데, 비번이 틀리면 에러 던지기
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    // 4. 일치하는 유저도 있고, 비번도 맞음
    return this.getAccessToken({ user });
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id },
      { secret: '나의비밀번호', expiresIn: '1h' },
    );
  }
}
