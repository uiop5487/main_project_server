import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { ProductImageService } from '../productsImage/productImage.service';
import { ProductTag } from '../productsTags/entities/productTag.entity';
import { Product } from './entities/product.entity';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class ProductServices {
  constructor(
    @InjectRepository(Product)
    private readonly prdouctRepository: Repository<Product>,

    @InjectRepository(ProductTag)
    private readonly productTagRepository: Repository<ProductTag>,

    private readonly productImageService: ProductImageService,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,

    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  async findRedis({ search }) {
    const result = await this.cacheManager.get(search);
    return result;
  }

  async findElastic({ search }) {
    const result: any = await this.elasticsearchService.search({
      index: 'myproduct',
      _source: [
        'unit',
        'isbest',
        'isnew',
        'name',
        'contents',
        'volume',
        'price',
        'origin',
        'id',
        'issoldout',
      ],
      query: {
        match: {
          contents: search,
        },
      },
    });

    const result2 = result.hits.hits.map((el) => {
      return el._source;
    });

    await this.cacheManager.set(`${search}`, result2, {
      ttl: 10000,
    });

    return result2;
  }

  async findAll() {
    return this.prdouctRepository.find({
      relations: [
        'type',
        'category',
        'type.maintype',
        'category.maincategory',
        'seller',
        'tags',
      ],
    });
  }

  async findOne({ prodcutId }) {
    return this.prdouctRepository.findOne({
      where: { id: prodcutId },
      relations: [
        'type',
        'category',
        'type.maintype',
        'category.maincategory',
        'seller',
        'tags',
        'productImage',
      ],
    });
  }

  findWithDeleted() {
    return this.prdouctRepository.find({
      withDeleted: true,
      relations: [
        'type',
        'category',
        'type.maintype',
        'category.maincategory',
        'seller',
        'tags',
        'productImage',
      ],
    });
  }

  async create({ createProductInput }) {
    const { productCategoryId, productTypeId, sellerId, tags, ...product } =
      createProductInput;

    const productTags = [];

    for (let i = 0; i < tags.length; i++) {
      const newTag = tags[i].replace('#', '');

      const prevTag = await this.productTagRepository.findOne({
        where: { name: tags[i] },
      });

      if (prevTag) {
        productTags.push(prevTag);
      } else {
        const aaa = await this.productTagRepository.save({ name: newTag });
        productTags.push(aaa);
      }
    }

    const result2 = await this.prdouctRepository.save({
      ...product,
      seller: { id: sellerId },
      category: { id: productCategoryId },
      type: { id: productTypeId },
      tags: productTags,
    });

    const aaa = await this.productImageService.createImage({
      image: createProductInput.productImage,
      product: result2,
    });

    console.log(aaa);

    return {
      ...result2,
      productImage: createProductInput.productImage,
    };
  }

  async update({ productId, updateProductInput }) {
    const product = await this.prdouctRepository.findOne({
      where: { id: productId },
    });

    let find: any;

    if (updateProductInput.productImage) {
      const image = await this.productImageService.updateImage({
        image: updateProductInput.productImage,
        product: product,
      });

      find = await this.productImageService.changeImage({ image });
    } else {
      find = await this.productImageService.findImage({ productId });
    }

    const result = await this.prdouctRepository.save({
      ...product,
      id: productId,
      ...updateProductInput,
    });

    return {
      ...result,
      productImage: find,
    };
  }

  async checkSoldOut({ productId }) {
    const product = await this.prdouctRepository.findOne({
      where: { id: productId },
    });

    if (product.isSoldout)
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
  }

  async delete({ productId }) {
    const result = await this.prdouctRepository.softDelete({ id: productId }); // 다른 것으로도 삭제 가능
    return result.affected ? true : false;
  }

  async restore({ productId }) {
    const retoreResopnse = await this.prdouctRepository.restore(productId);
    return retoreResopnse.affected ? true : false;
  }

  async asd({ image, product }) {
    this.productImageService.updateImage({ image, product });
  }
}
