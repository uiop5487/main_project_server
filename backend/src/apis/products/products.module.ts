import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesService } from '../files/files.service';
import { ProductImage } from '../productsImage/entities/productImage.entity';
import { ProductImageService } from '../productsImage/productImage.service';
import { ProductTag } from '../productsTags/entities/productTag.entity';
import { Product } from './entities/product.entity';
import { ProductResolvers } from './products.resolver';
import { ProductServices } from './products.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    // typeorm 모듈은 엔티티를 전달한다. 없으면 데이터베이스와 연동이 안됨
    TypeOrmModule.forFeature([
      Product, //
      ProductTag,
      ProductImage,
    ]),
    ElasticsearchModule.register({
      node: 'http://elasticsearch:9200',
    }),
  ],
  providers: [
    ProductResolvers, //
    ProductServices,
    ProductImageService,
    FilesService,
  ],
})
export class ProductModules {}
