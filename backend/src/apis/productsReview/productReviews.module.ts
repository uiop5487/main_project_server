import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesService } from '../files/files.service';
import { Product } from '../products/entities/product.entity';
import { ProductServices } from '../products/products.service';
import { ProductImage } from '../productsImage/entities/productImage.entity';
import { ProductImageService } from '../productsImage/productImage.service';
import { ProductReviewImage } from '../productsReviewImage/entities/productReviewImage.entity';
import { ProductTag } from '../productsTags/entities/productTag.entity';
import { User } from '../users/entities/user.entity';
import { UsersServices } from '../users/users.service';
import { ProductReview } from './entities/productReview.entity';
import { ProductReviewsResolver } from './productReviews.resolver';
import { ProductReviewsService } from './productReviews.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductReview, //
      ProductReviewImage,
      User,
      Product,
      ProductTag,
      ProductImage,
    ]),
    ElasticsearchModule.register({
      node: 'http://elasticsearch:9200',
    }),
  ],
  providers: [
    ProductReviewsResolver, //
    ProductReviewsService,
    UsersServices,
    ProductServices,
    ProductImageService,

    FilesService,
  ],
})
export class ProductReviewsModule {}
