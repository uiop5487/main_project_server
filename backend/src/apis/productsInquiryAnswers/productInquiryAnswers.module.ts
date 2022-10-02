import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductInquiry } from '../productsInquiry/entities/productInquiry.entity';
import { ProductInquiriesService } from '../productsInquiry/productInquiries.service';
import { Seller } from '../sellers/entities/seller.entity';
import { SellerServices } from '../sellers/sellers.service';
import { ProductInquiryAnswer } from './entities/productInquiryAnswer.entity';
import { ProductInquiryAnswersResolver } from './productInquiryAnswers.resolver';
import { ProductInquiryAnswersService } from './productInquiryAnswers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductInquiryAnswer, //
      ProductInquiry,
      Seller,
    ]),
  ],
  providers: [
    ProductInquiryAnswersResolver, //
    ProductInquiryAnswersService,
    ProductInquiriesService,
    SellerServices,
  ],
})
export class ProductInquiryAnswersModule {}
