import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductInquiry } from './entities/productInquiry.entity';

@Injectable()
export class ProductInquiriesService {
  constructor(
    @InjectRepository(ProductInquiry)
    private readonly productInquiryRepository: Repository<ProductInquiry>,
  ) {}

  findAllByProductId({ productId }) {
    return this.productInquiryRepository.find({
      where: { product: { id: productId } },
      relations: {
        product: true,
        user: true,
      },
    });
  }

  async findOne({ inquiryId }) {
    return await this.productInquiryRepository.findOne({
      where: { id: inquiryId },
      relations: {
        product: true,
        user: true,
      },
    });
  }

  create({ contents, product, user }) {
    return this.productInquiryRepository.save({
      contents,
      product,
      user,
    });
  }

  update({ inquiry, contents }) {
    return this.productInquiryRepository.save({
      ...inquiry,
      contents: contents ? contents : inquiry.contents,
    });
  }

  delete({ inquiryId }) {
    return this.productInquiryRepository.softDelete({
      id: inquiryId,
    });
  }
}
