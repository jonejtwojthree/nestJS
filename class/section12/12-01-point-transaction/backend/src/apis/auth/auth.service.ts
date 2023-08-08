import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
  IAuthServiceRestoreAccessToken,
  IAuthServiceSetRefreshToken,
} from './interfaces/auth-service.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login({
    email,
    password,
    context,
  }: IAuthServiceLogin): Promise<string> {
    // 1. 이메일이 일치하는 유저를 DB에서 찾기
    const user = await this.usersService.findOneByEmail({ email });

    // 2. 일치하는 유저가 없으면 에러 던지기
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');

    // const isAuth = await bcrypt.compare(password, user.password);
    const isAuth = password;

    // 3. 일치하는 유저가 있는데, 비번이 틀리면 에러 던지기
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { secret: '나의리프레시비밀번호', expiresIn: '2w' },
    );

    context.res.setHeader(
      'set-Cookie',
      `refreshToken=${refreshToken}; path=/;`,
    );
    // context.res.setHeader(
    //   'set-Cookie',
    //   `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure: httpOnly`,
    // );

    // context.res.setHeader(
    //   'Access-Contorl-Allow-Origin',
    //   'https://myfrontsite.com',
    // );

    // 4. refreshToken(JWN)만들어서 브라우저 크키에 저장해서 보내주기

    this.setRefreshToken({ user, context });

    // 5. 일치하는 유저도 있고, 비번도 맞음
    return this.getAccessToken({ user });
  }

  restoreAccessToken({ user }: IAuthServiceRestoreAccessToken): string {
    return this.getAccessToken({ user });
  }

  setRefreshToken({ user, context }: IAuthServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { secret: '나의리프레시비밀번호', expiresIn: '2w' },
    );

    // 개발환경
    context.res.setHeader(
      'set-Cookie',
      `refreshToken=${refreshToken}; path=/;`,
    );

    // 배포환경
    // context.res.setHeader(
    //   'set-Cookie',
    //   `refreshToken=${refreshToken}; path=/; domain=mybacksite.com; SameSite=None; Secure: httpOnly`,
    // );

    context.res.setHeader(
      'Access-Control-Allow-Origin',
      'https://myfrontsite.com',
    );
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    console.log('=========================');
    console.log(user);
    console.log('=========================');

    return this.jwtService.sign({
      payload: { sub: user.id },
      options: { secret: '나의비밀번호', expireIn: '1h' },
    });
  }
}
