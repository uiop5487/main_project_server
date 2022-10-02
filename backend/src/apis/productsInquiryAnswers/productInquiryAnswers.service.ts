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

  findAll({ inquiryId }) {
    return this.productInquiryAnswerRepository.find({
      where: { inquiry: { id: inquiryId } },
      relations: {
        inquiry: true,
        seller: true,
      },
    });
  }

  async findOne({ inquiryAnswerId }) {
    return await this.productInquiryAnswerRepository.findOne({
      where: { id: inquiryAnswerId },
      relations: {
        inquiry: true,
        seller: true,
      },
    });
  }

  create({ inquiry, seller, contents }) {
    return this.productInquiryAnswerRepository.save({
      contents,
      inquiry,
      seller,
    });
  }

  update({ contents, inquiryAnswer }) {
    return this.productInquiryAnswerRepository.save({
      ...inquiryAnswer,
      contents: contents ? contents : inquiryAnswer.contents,
    });
  }

  delete({ inquiryAnswerId }) {
    return this.productInquiryAnswerRepository.softDelete({
      id: inquiryAnswerId,
    });
  }
}
