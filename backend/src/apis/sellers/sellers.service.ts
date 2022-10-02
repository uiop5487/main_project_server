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

  findAll() {
    return this.sellerRepository.find();
  }

  findOne({ sellerId }) {
    return this.sellerRepository.findOne({
      where: { id: sellerId },
    });
  }

  async findEmail({ email }) {
    return await this.sellerRepository.findOne({
      where: { email: email },
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

  async update({ updateSellerInput, email }) {
    const seller = await this.sellerRepository.findOne({
      where: { email },
    });

    return this.sellerRepository.save({
      ...seller,
      ...updateSellerInput,
    });
  }

  delete({ email }) {
    return this.sellerRepository.softDelete({
      email: email,
    });
  }
}
