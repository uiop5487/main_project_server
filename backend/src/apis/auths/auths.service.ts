import {
  Injectable,
  UnauthorizedException,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersServices } from '../users/users.service';
import * as jwt from 'jsonwebtoken';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthsService {
  constructor(
    private readonly jwtService: JwtService, //
    private readonly usersService: UsersServices,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: 'myRefreshKey', expiresIn: '2w' },
    );

    console.log(refreshToken);

    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);
  }

  getAccessToken({ user }) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: 'myAccessKey', expiresIn: '1h' },
    );
  }

  async sosialLogin({ req, res }) {
    let user = await this.usersService.findEmail({ email: req.user.email });

    if (!user)
      user = await this.usersService.create({
        createUserInput: req.user,
        hashedPassword: req.user.hashedPassword,
      });

    this.setRefreshToken({ user, res });

    res.redirect(
      'http://localhost:5500/main-project/frontend/login/index.html',
    );
  }

  async checkToken({ accessToken, refreshToken }) {
    try {
      const currentDate = new Date();
      const sec = Math.abs(currentDate.getTime() / 1000);

      const decodedAccessToken = jwt.verify(accessToken, 'myAccessKey');

      if (typeof decodedAccessToken !== 'string') {
        const currentTtl = decodedAccessToken.exp - Math.ceil(sec);

        await this.cacheManager.set(
          `accessToken:${accessToken}`,
          { logout: true },
          {
            ttl: currentTtl,
          },
        );
      }

      const decodedRefreshToken = jwt.verify(refreshToken, 'myRefreshKey');
      if (typeof decodedRefreshToken !== 'string') {
        const currentRefreshTtl = decodedRefreshToken.exp - Math.ceil(sec);

        await this.cacheManager.set(
          `refreshToken:${refreshToken}`,
          { logout: true },
          {
            ttl: currentRefreshTtl,
          },
        );
      }

      return '로그아웃이 되었습니다.';
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
