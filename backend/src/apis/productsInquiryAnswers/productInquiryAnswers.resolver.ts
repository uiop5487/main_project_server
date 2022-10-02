import { UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/type/context';
import { ProductInquiryAnswer } from './entities/productInquiryAnswer.entity';
import { ProductInquiryAnswersService } from './productInquiryAnswers.service';
import { ProductInquiriesService } from '../productsInquiry/productInquiries.service';
import { SellerServices } from '../sellers/sellers.service';

@Resolver()
export class ProductInquiryAnswersResolver {
  constructor(
    private readonly productInquiryAnswersService: ProductInquiryAnswersService,
    private readonly productInquiriesService: ProductInquiriesService,
    private readonly sellersService: SellerServices,
  ) {}

  @Query(() => [ProductInquiryAnswer])
  fetchInquiryAnswers(
    @Args('inquiryId') inquiryId: string, //
  ) {
    return this.productInquiryAnswersService.findAll({ inquiryId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => ProductInquiryAnswer)
  async createInquiryAnswer(
    @Args('inquiryId') inquiryId: string, //
    @Args('contents') contents: string,
    @Context() context: IContext,
  ) {
    const email = context.req.user.email;

    const inquiry = await this.productInquiriesService.findOne({ inquiryId });

    const seller = await this.sellersService.findEmail({ email });

    return this.productInquiryAnswersService.create({
      inquiry,
      seller,
      contents,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => ProductInquiryAnswer)
  async updateInquiryAnswer(
    @Args('contents') contents: string,
    @Args('inquiryAnswerId') inquiryAnswerId: string,
    @Context() context: IContext,
  ) {
    const email = context.req.user.email;

    const inquiryAnswer = await this.productInquiryAnswersService.findOne({
      inquiryAnswerId,
    });

    if (email !== inquiryAnswer.seller.email)
      throw new UnprocessableEntityException(
        '답글을 등록한 유저만이 수정할 수 있습니다.',
      );

    return this.productInquiryAnswersService.update({
      contents,
      inquiryAnswer,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteInquiryAnswer(
    @Args('inquiryAnswerId') inquiryAnswerId: string,
    @Context() context: IContext,
  ) {
    const email = context.req.user.email;

    const inquiryAnswer = await this.productInquiryAnswersService.findOne({
      inquiryAnswerId,
    });

    if (email !== inquiryAnswer.seller.email)
      throw new UnprocessableEntityException(
        '답글을 등록한 유저만이 삭제할 수 있습니다.',
      );

    return (await this.productInquiryAnswersService.delete({ inquiryAnswerId }))
      .affected;
  }
}
