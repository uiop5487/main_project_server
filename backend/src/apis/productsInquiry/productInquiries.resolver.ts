import { UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/type/context';
import { ProductServices } from '../products/products.service';
import { UsersServices } from '../users/users.service';
import { ProductInquiry } from './entities/productInquiry.entity';
import { ProductInquiriesService } from './productInquiries.service';

@Resolver()
export class ProductInquiriesResolver {
  constructor(
    private readonly productInquiriesService: ProductInquiriesService, //
    private readonly productsService: ProductServices,
    private readonly usersService: UsersServices,
  ) {}

  @Query(() => [ProductInquiry])
  fetchInquiries(
    @Args('productId') productId: string, //
  ) {
    return this.productInquiriesService.findAllByProductId({ productId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => ProductInquiry)
  async createInquiry(
    @Args('contents') contents: string, //
    @Args('productId') productId: string,
    @Context() context: IContext,
  ) {
    const email = context.req.user.email;

    const user = await this.usersService.findEmail({ email });

    const product = await this.productsService.findOne({ productId });

    return this.productInquiriesService.create({ contents, product, user });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => ProductInquiry)
  async updateInquiry(
    @Args('contents') contents: string,
    @Args('inquiryId') inquiryId: string, //
    @Context() context: IContext,
  ) {
    const email = context.req.user.email;

    const inquiry = await this.productInquiriesService.findOne({ inquiryId });

    if (email !== inquiry.user.email)
      throw new UnprocessableEntityException(
        '등록한 유저만이 수정할 수 있습니다.',
      );

    return this.productInquiriesService.update({ inquiry, contents });
  }

  @Mutation(() => Boolean)
  async deleteInquiry(
    @Args('inquiryId') inquiryId: string, //
    @Context() context: IContext,
  ) {
    const email = context.req.user.email;

    const inquiry = await this.productInquiriesService.findOne({ inquiryId });
    if (inquiry.user.email !== email)
      throw new UnprocessableEntityException(
        '등록한 유저만이 삭제 할 수 있습니다.',
      );

    return (await this.productInquiriesService.delete({ inquiryId })).affected;
  }
}
