import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductReview } from './entities/productReview.entity';

@Injectable()
export class ProductReviewsService {
  constructor(
    @InjectRepository(ProductReview)
    private readonly productReviewRepository: Repository<ProductReview>,
  ) {}

  findAllByProductId({ productId }) {
    return this.productReviewRepository.find({
      where: {
        product: { id: productId },
      },
      relations: {
        user: true,
        product: {
          category: true,
        },
      },
    });
  }

  findOne({ reviewId }) {
    return this.productReviewRepository.findOne({
      where: { id: reviewId },
      relations: {
        user: true,
        product: true,
      },
    });
  }

  create({ contents, user, product }) {
    return this.productReviewRepository.save({
      contents,
      user,
      product,
    });
  }

  async update({ contents, reviewId }) {
    const curReview = await this.productReviewRepository.findOne({
      where: { id: reviewId },
      relations: {
        user: true,
        product: {
          category: true,
        },
      },
    });
    return this.productReviewRepository.save({
      ...curReview,
      contents: contents ? contents : curReview.contents,
    });
  }

  delete({ reviewId }) {
    return this.productReviewRepository.softDelete({
      id: reviewId,
    });
  }
}
