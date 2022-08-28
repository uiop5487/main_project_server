import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { User } from './entities/user.entity';
import { UsersServices } from './users.service';
import * as bcrypt from 'bcrypt';
import { UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';

@Resolver()
export class UsersResolvers {
  constructor(
    private readonly usersServices: UsersServices, //
  ) {}

  @Query(() => [User])
  fetchUsers() {
    return this.usersServices.findAll();
  }

  @Query(() => User)
  fetchUser(
    @Args('userId') userId: string, //
  ) {
    return this.usersServices.findOne({ userId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => User)
  async fetchLoginUser(
    @Context() context: any, //
  ): Promise<User> {
    const userId = context.req.user.id;
    return this.usersServices.findOne({ userId });
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput, //
  ) {
    const hashedPassword = await bcrypt.hash(
      String(createUserInput.password),
      10.2,
    );
    return this.usersServices.create({ createUserInput, hashedPassword });
  }

  @Mutation(() => User)
  async updateUser(
    @Args('userEmail') email: string, //
    @Args('password') password: string, //
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    const user = await this.usersServices.findEmail({ email });
    if (!user)
      throw new UnprocessableEntityException('이메일이 존재하지 않습니다.');

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다.');

    return this.usersServices.update({
      userEmail: email,
      updateUserInput,
    });
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Args('userEmail') email: string, //
    @Args('password') password: string, //
  ) {
    const user = await this.usersServices.findEmail({ email });
    if (!user)
      throw new UnprocessableEntityException('이메일이 존재하지 않습니다.');

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다.');

    return this.usersServices.delete({ email });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteLoginUser(
    @Args('password') password: string, //
    @Context() context: any, //
  ): Promise<boolean> {
    const user = await this.usersServices.findEmail({ email: context.email });
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다.');
    const email = context.req.user.email;
    return this.usersServices.delete({ email });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async updateUserPwd(
    @Args('userEmail') email: string, //
    @Args('password') password: string, //
    @Args('updatePassword') updatePassword: string,
  ) {
    const user = await this.usersServices.findEmail({ email });
    if (!user)
      throw new UnprocessableEntityException('이메일이 존재하지 않습니다.');

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다.');

    const hashedPassword = await bcrypt.hash(updatePassword, 10.2);

    this.usersServices.updatePwd({ user, hashedPassword });
    return '비밀번호가 변경되었습니다.';
  }
}
