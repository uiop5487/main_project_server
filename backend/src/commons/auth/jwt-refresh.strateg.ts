import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie;
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },
      secretOrKey: 'myRefreshKey',
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload) {
    const refreshToken = req.headers.cookie.replace('refreshToken=', '');
    const isValid = await this.cacheManager.get(`refreshToken:${refreshToken}`);
    if (isValid) throw new UnauthorizedException('로그아웃 된 토큰입니다.');
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
