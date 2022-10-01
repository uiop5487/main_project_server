import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductInquiryAnswer } from './entities/productInquiryAnswer.entity';

@Injectable()
export class ProductInquiryAnswersService {
  constructor(
    @InjectRepository(ProductInquiryAnswer)
    private readonly productInquiryAnswerRepository: Repository<ProductInquiryAnswer>,
  ) {}
}
