import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/type/context';
import { ProductInquiryAnswer } from './entities/productInquiryAnswer.entity';
import { ProductInquiryAnswersService } from './productInquiryAnswers.service';

@Resolver()
export class ProductInquiryAnswersResolver {
  constructor(
    private readonly productInquiryAnswersService: ProductInquiryAnswersService,
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => ProductInquiryAnswer)
  createInquiryAnswer(
    @Args('inquiryId') inquiryId: string, //
    @Args('contents') contents: string,
    @Context() context: IContext,
  ) {
    const email = context.req.user.email;
  }
}
