import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductReviewImage } from '../productsReviewImage/entities/productReviewImage.entity';
import { ProductReview } from './entities/productReview.entity';

@Injectable()
export class ProductReviewsService {
  constructor(
    @InjectRepository(ProductReview)
    private readonly productReviewRepository: Repository<ProductReview>,

    @InjectRepository(ProductReviewImage)
    private readonly productReviewImageRepository: Repository<ProductReviewImage>,
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
        image: true,
      },
    });
  }

  findOne({ reviewId }) {
    return this.productReviewRepository.findOne({
      where: { id: reviewId },
      relations: {
        user: true,
        product: {
          category: true,
        },
        image: true,
      },
    });
  }

  async create({ createReviewInput, user, product }) {
    const { contents, image } = createReviewInput;

    const review = await this.productReviewRepository.save({
      contents,
      user,
      product,
    });

    const saveImage = [];
    if (image && image.length >= 1) {
      for (let i = 0; i < image.length; i++) {
        const img = await this.productReviewImageRepository.save({
          review,
          url: image[i],
        });
        saveImage.push(img);
      }
    } else {
      saveImage.push('defaultImg.jpeg');
    }

    return {
      ...review,
      image: saveImage,
    };
  }

  async update({ updateReviewInput, reviewId }) {
    const curReview = await this.productReviewRepository.findOne({
      where: { id: reviewId },
      relations: {
        user: true,
        product: {
          category: true,
        },
        image: true,
      },
    });
    const { contents, image } = updateReviewInput;
    const review = await this.productReviewRepository.save({
      ...curReview,
      contents: contents ? contents : curReview.contents,
    });

    const updateImg = [];

    if (image && image.length >= 1) {
      this.productReviewImageRepository.delete({
        review: { id: curReview.id },
      });
      for (let i = 0; i < image.length; i++) {
        const img = await this.productReviewImageRepository.save({
          review: curReview,
          url: image[i],
        });
        updateImg.push(img);
      }
    } else {
      updateImg.push(...curReview.image);
    }
    return {
      ...review,
      image: updateImg,
    };
  }

  delete({ reviewId }) {
    this.productReviewImageRepository.softDelete({
      review: { id: reviewId },
    });
    return this.productReviewRepository.softDelete({
      id: reviewId,
    });
  }
}
