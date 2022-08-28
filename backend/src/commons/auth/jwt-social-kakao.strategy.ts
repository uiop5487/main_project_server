import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

export class JwtKaKaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAKO_CLIENT_ID,
      clientSecret: process.env.KAKAKO_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/kakao',
    });
  }

  validate(_, __, profile) {
    return {
      email: profile._json.kakao_account.email,
      hashedPassword: '1234',
      name: profile.username,
      phone: '01000000000',
      address: '서울시 구로구 구로동',
      rank: 'F',
    };
  }
}
