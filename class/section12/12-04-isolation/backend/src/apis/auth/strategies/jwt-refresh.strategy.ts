import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// import {NaverStrategy} from 'passport-naver'
// import {GoogleStrategy} from 'passport-google'

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        console.log(req);
        const cookie = req.headers.cookie;
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },
      secretOrKey: '나의리프레시비밀번호',
    });
  }

  validate(payload: any) {
    console.log(payload);
    return { id: payload.sub };
  }
}
