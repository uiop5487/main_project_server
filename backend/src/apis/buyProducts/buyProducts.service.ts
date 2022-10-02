import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuyProduct } from './entities/buyProduct.entity';

@Injectable()
export class BuyProductsService {
  constructor(
    @InjectRepository(BuyProduct)
    private readonly buyProductRepository: Repository<BuyProduct>,
  ) {}

  findByUserEmail({ email }) {
    return this.buyProductRepository.find({
      where: { user: { email: email } },
      relations: {
        user: true,
        product: true,
      },
    });
  }

  create({ product, user }) {
    return this.buyProductRepository.save({
      product,
      user,
    });
  }
}
