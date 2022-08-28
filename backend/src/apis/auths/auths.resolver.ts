import { UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UsersServices } from '../users/users.service';
import { AuthsService } from './auths.service';
import * as bcrypt from 'bcrypt';
import { IContext } from 'src/commons/type/context';
import {
  GqlAuthAccessGuard,
  GqlAuthRefreshGuard,
} from 'src/commons/auth/gql-auth.guard';
import { Cache } from 'cache-manager';

@Resolver()
export class AuthsResolver {
  constructor(
    private readonly authsService: AuthsService, //
    private readonly usersService: UsersServices,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Context() context: IContext,
  ) {
    const user = await this.usersService.findEmail({ email });

    if (!user)
      throw new UnprocessableEntityException('이메일이 존재하지 않습니다.');

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword)
      throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다.');

    this.authsService.setRefreshToken({ user, res: context.res });

    return this.authsService.getAccessToken({ user });
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthAccessGuard)
  async logout(
    @Context() context: any, //
  ) {
    try {
      const accessToken = context.req.headers.authorization.replace(
        'Bearer ',
        '',
      );
      const refreshToken = context.req.headers.cookie.replace(
        'refreshToken=',
        '',
      );

      return this.authsService.checkToken({ accessToken, refreshToken });
    } catch (err) {}
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  restoreAccessToken(
    @Context() context: IContext, //
  ) {
    return this.authsService.getAccessToken({ user: context.req.user });
  }
}
