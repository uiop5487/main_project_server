import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PickedProduct } from './entities/pickedProduct.entity';

@Injectable()
export class PickedProductsService {
  constructor(
    @InjectRepository(PickedProduct)
    private readonly pickedProductRepository: Repository<PickedProduct>,
  ) {}

  findOne({ email, productId }) {
    return this.pickedProductRepository.findOne({
      where: { product: { id: productId }, user: { email: email } },
      relations: {
        product: true,
        user: true,
      },
    });
  }

  findByEmail({ email }) {
    return this.pickedProductRepository.find({
      where: { user: { email: email } },
      relations: {
        product: true,
        user: true,
      },
    });
  }

  create({ product, user }) {
    this.pickedProductRepository.save({
      product,
      user,
    });
  }

  delete({ pickedProductId }) {
    this.pickedProductRepository.delete({
      id: pickedProductId,
    });
  }
}
