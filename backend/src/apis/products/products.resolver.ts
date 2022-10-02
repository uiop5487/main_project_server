import { UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/type/context';
import { BuyProductsService } from '../buyProducts/buyProducts.service';
import { BuyProduct } from '../buyProducts/entities/buyProduct.entity';
import { PickedProduct } from '../pickedProducts/entities/pickedProduct.entity';
import { PickedProductsService } from '../pickedProducts/pickedProducts.service';
import { UsersServices } from '../users/users.service';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductServices } from './products.service';

@Resolver()
export class ProductResolvers {
  constructor(
    private readonly productServices: ProductServices, //
    private readonly pickedProductsService: PickedProductsService,
    private readonly usersService: UsersServices,
    private readonly buyProductsService: BuyProductsService,
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
    @Args('productId') productId: string, //
  ) {
    return this.productServices.findOne({ productId });
  }

  @Query(() => [Product])
  fetchProductWithDeleted() {
    return this.productServices.findWithDeleted();
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [PickedProduct])
  fetchPickedProduct(
    @Context() context: IContext, //
  ) {
    const email = context.req.user.email;

    return this.pickedProductsService.findByEmail({ email });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [BuyProduct])
  fetchBuyProduct(
    @Context() context: IContext, //
  ) {
    const email = context.req.user.email;

    return this.buyProductsService.findByUserEmail({ email });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [Product])
  fetchProductSolds(
    @Context() context: IContext, //
  ) {
    const email = context.req.user.email;

    return this.productServices.findBySolodoutWithSeller({ email });
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

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async pickedProduct(
    @Args('productId') productId: string,
    @Context() context: IContext,
  ) {
    const email = context.req.user.email;

    const prePicked = await this.pickedProductsService.findOne({
      email,
      productId,
    });

    if (prePicked) {
      this.pickedProductsService.delete({ pickedProductId: prePicked.id });
      return false;
    }

    const product = await this.productServices.findOne({ productId });

    const user = await this.usersService.findEmail({ email });

    this.pickedProductsService.create({ product, user });

    return true;
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => BuyProduct)
  async buyProduct(
    @Args('productId') productId: string, //
    @Context() context: IContext,
  ) {
    const email = context.req.user.email;

    const user = await this.usersService.findEmail({ email });

    const product = await this.productServices.findOne({ productId });

    if (user.point < product.price)
      throw new UnprocessableEntityException('보유중인 포인트가 부족합니다.');

    if (product.isSoldout)
      throw new UnprocessableEntityException('이미 판매된 목록입니다.');

    this.productServices.updateIsSoldOut({ product });

    this.usersService.updatePoint({ user, price: product.price });

    return this.buyProductsService.create({ user, product });
  }
}
