import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductReview } from './entities/productReview.entity';
import { ProductReviewsResolver } from './productReviews.resolver';
import { ProductReviewsService } from './productReviews.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductReview, //
    ]),
  ],
  providers: [
    ProductReviewsResolver, //
    ProductReviewsService,
  ],
})
export class ProductReviewsModule {}
