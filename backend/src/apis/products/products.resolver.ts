import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductServices } from './products.service';

@Resolver()
export class ProductResolvers {
  constructor(
    private readonly productServices: ProductServices, //
  ) {}

  @Query(() => [Product])
  async fetchProducts(
    @Args({ name: 'search', nullable: true }) search: string, //
  ) {
    const isRedis = await this.productServices.findRedis({ search });

    console.log(isRedis);

    if (isRedis !== null) return isRedis;

    const iselastic = await this.productServices.findElastic({ search });

    console.log(iselastic);

    return iselastic;
  }

  @Query(() => Product)
  fetchProduct(
    @Args('productId') prodcutId: string, //
  ) {
    return this.productServices.findOne({ prodcutId });
  }

  @Query(() => [Product])
  fetchProductWithDeleted() {
    return this.productServices.findWithDeleted();
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput, //
  ) {
    return this.productServices.create({ createProductInput });
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    // 판매완료 여부 확인
    await this.productServices.checkSoldOut({ productId });

    // 수정
    return this.productServices.update({ productId, updateProductInput });
  }

  @Mutation(() => Boolean)
  deleteProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productServices.delete({ productId });
  }

  @Mutation(() => Boolean)
  restoreProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productServices.restore({ productId });
  }
}
