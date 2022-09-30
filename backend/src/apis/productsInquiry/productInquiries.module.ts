import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesService } from '../files/files.service';
import { Product } from '../products/entities/product.entity';
import { ProductServices } from '../products/products.service';
import { ProductImage } from '../productsImage/entities/productImage.entity';
import { ProductImageService } from '../productsImage/productImage.service';
import { ProductTag } from '../productsTags/entities/productTag.entity';
import { User } from '../users/entities/user.entity';
import { UsersServices } from '../users/users.service';
import { ProductInquiry } from './entities/productInquiry.entity';
import { ProductInquiriesResolver } from './productInquiries.resolver';
import { ProductInquiriesService } from './productInquiries.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductInquiry, //
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
    ProductInquiriesResolver, //
    ProductInquiriesService,
    UsersServices,
    ProductServices,
    ProductImageService,

    FilesService,
  ],
})
export class ProductInquiriesModule {}
