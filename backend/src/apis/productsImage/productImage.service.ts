import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilesService } from '../files/files.service';
import { ProductImage } from './entities/productImage.entity';

@Injectable()
export class ProductImageService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>, //

    private readonly fileUploadService: FilesService,
  ) {}
  async createImage({ image, product }) {
    console.log(product);
    const result = await Promise.all(
      image.map(
        (el) =>
          new Promise((resolve) => {
            const result = this.productImageRepository.save({
              url: el,
              product,
            });
            resolve(result);
          }),
      ),
    );
    return result;
  }

  async updateImage({ image, product }) {
    const findProduct = await this.productImageRepository.find({
      where: { product: { id: product.id } },
    });

    await this.productImageRepository.delete({
      product: { id: product.id },
    });

    // const file = findProduct.map((el) =>
    //   el.url.replace('codecamp-backend-storage/', ''),
    // );
    // console.log(file);

    // const aaa = await this.fileUploadService.delete({ file });

    // console.log(aaa);

    const result = await Promise.all(
      image.map(
        (el) =>
          new Promise((resolve) => {
            const result = this.productImageRepository.save({
              url: el,
              product: product,
            });
            resolve(result);
          }),
      ),
    );

    return result;
  }

  async changeImage({ image }) {
    return image.map((el) => el.url);
  }

  async findImage({ productId }) {
    return await this.productImageRepository.find({
      where: { product: { id: productId } },
    });
  }
}
