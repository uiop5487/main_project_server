import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache, //
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'myAccessKey',
      passReqToCallback: true,
    });
  }

  async validate(req, payload: any) {
    const accessToken = req.headers.authorization.replace('Bearer ', '');
    const isValid = await this.cacheManager.get(`accessToken:${accessToken}`);
    if (isValid) throw new UnauthorizedException('로그아웃 된 토큰입니다.');
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
