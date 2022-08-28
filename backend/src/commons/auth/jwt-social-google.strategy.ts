import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/google',
      scope: ['email', 'profile'],
    });
  }

  validate(_, __, profile) {
    return {
      email: profile.emails[0].value,
      hashedPassword: '1234',
      name: profile.displayName,
      phone: '01000000000',
      address: '서울시 구로구 구로동',
      rank: 'F',
    };
  }
}
