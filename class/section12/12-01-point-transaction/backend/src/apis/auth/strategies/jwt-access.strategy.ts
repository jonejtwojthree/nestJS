import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// import {NaverStrategy} from 'passport-naver'
// import {GoogleStrategy} from 'passport-google'

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      //   jwtFromRequest: (req) => {
      //     const temp = req.headers.Authorization;
      //     const accessToken = temp.toLowercase().replace('bearer', '');
      //     return accessToken;
      //   },
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '나의비밀번호',
    });
  }

  validate(payload: any) {
    console.log(payload);
    return { userId: payload.sub, username: payload.username };
  }
}
