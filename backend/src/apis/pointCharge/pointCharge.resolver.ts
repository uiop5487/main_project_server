import {
  ConflictException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/type/context';
import { IamportService } from '../iamport/iamport.service';
import { UsersServices } from '../users/users.service';
import {
  PointCharge,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointCharge.entity';
import { PointChargeService } from './pointCharge.service';

@Resolver()
export class PointChargeResolver {
  constructor(
    private readonly pointsTransctionsService: PointChargeService, //
    private readonly iamportService: IamportService, //
    private readonly usersService: UsersServices,
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointCharge)
  async createPointCharge(
    @Args('impUid') impUid: string, //
    @Args({ name: 'amount', type: () => Int }) amount: number,
    @Context() context: IContext,
  ) {
    const user = context.req.user;

    const isPyment = await this.pointsTransctionsService.findPayment({
      impUid,
    });

    if (isPyment) throw new ConflictException('이미 결제된 내역입니다.');

    const token = await this.iamportService.createrIamportAccessToken();

    const isValid = await this.iamportService.checkPayment({ token, impUid });

    if (typeof isValid === 'string')
      throw new UnprocessableEntityException(isValid);

    return this.pointsTransctionsService.create({ impUid, amount, user });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointCharge)
  async cancelPoint(
    @Args('impUid') impUid: string, //
    @Context() context: IContext,
  ) {
    const user = context.req.user;

    const result = await this.pointsTransctionsService.findPayment({ impUid });

    if (result.status === POINT_TRANSACTION_STATUS_ENUM.CANCEL)
      throw new UnprocessableEntityException('이미 환불 되었습니다.');

    const isUser = await this.usersService.findEmail({ email: user.email });

    if (isUser.id !== result.user.id)
      throw new UnprocessableEntityException('유저정보가 일치하지 않습니다.');

    const token = await this.iamportService.createrIamportAccessToken();

    const amount = await this.iamportService.cancelPayment({ impUid, token });

    return this.pointsTransctionsService.createCancle({ user, amount, impUid });
  }
}
