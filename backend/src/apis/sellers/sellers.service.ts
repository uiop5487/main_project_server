import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seller } from './entities/seller.entity';

@Injectable()
export class SellerServices {
  constructor(
    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>,
  ) {}

  async findAll() {
    return this.sellerRepository.find();
  }

  async findOne({ sellerId }) {
    return this.sellerRepository.findOne({
      where: { id: sellerId },
    });
  }

  async create({ createSellerInput }) {
    const email = await this.sellerRepository.findOne({
      where: { email: createSellerInput.email },
    });

    if (email) throw new ConflictException('이미 등록된 이메일입니다.');

    const result = await this.sellerRepository.save({
      ...createSellerInput,
    });

    return result;
  }
}
