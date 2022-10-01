import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductInquiryAnswer } from './entities/productInquiryAnswer.entity';
import { ProductInquiryAnswersResolver } from './productInquiryAnswers.resolver';
import { ProductInquiryAnswersService } from './productInquiryAnswers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductInquiryAnswer, //
    ]),
  ],
  providers: [ProductInquiryAnswersResolver, ProductInquiryAnswersService],
})
export class ProductInquiryAnswersModule {}
