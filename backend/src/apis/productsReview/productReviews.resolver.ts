import { UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/type/context';
import { ProductServices } from '../products/products.service';
import { UsersServices } from '../users/users.service';
import { CreateReviewInput } from './dto/productReview.input';
import { UpdateReviewInput } from './dto/updateProductReview.input';
import { ProductReview } from './entities/productReview.entity';
import { ProductReviewsService } from './productReviews.service';

@Resolver()
export class ProductReviewsResolver {
  constructor(
    private readonly productReviewsService: ProductReviewsService, //
    private readonly usersService: UsersServices,
    private readonly productsService: ProductServices,
  ) {}

  @Query(() => [ProductReview])
  fetchReviews(
    @Args('productId') productId: string, //
  ) {
    return this.productReviewsService.findAllByProductId({ productId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => ProductReview)
  async createReview(
    @Args('createReviewInput') createReviewInput: CreateReviewInput,
    @Args('productId') productId: string,
    @Context() context: IContext,
  ) {
    const email = context.req.user.email;

    const user = await this.usersService.findEmail({ email });

    const product = await this.productsService.findOne({ productId });

    return this.productReviewsService.create({
      createReviewInput,
      user,
      product,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => ProductReview)
  async updateReview(
    @Args('updateReviewInput') updateReviewInput: UpdateReviewInput, //
    @Args('reviewId') reviewId: string,
    @Context() context: IContext,
  ) {
    const email = context.req.user.email;

    const review = await this.productReviewsService.findOne({ reviewId });

    if (email !== review.user.email)
      throw new UnprocessableEntityException(
        '작성한 유저만이 수정 가능합니다.',
      );

    return this.productReviewsService.update({ updateReviewInput, reviewId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteReview(
    @Args('revuewId') reviewId: string, //
    @Context() context: IContext,
  ) {
    const email = context.req.user.email;

    const review = await this.productReviewsService.findOne({ reviewId });

    if (email !== review.user.email)
      throw new UnprocessableEntityException(
        '작성한 유저만이 삭제 가능합니다.',
      );

    return (await this.productReviewsService.delete({ reviewId })).affected;
  }
}
