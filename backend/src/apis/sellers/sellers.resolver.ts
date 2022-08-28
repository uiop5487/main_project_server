import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateSellerInput } from './dto/createSeller.input';
import { Seller } from './entities/seller.entity';
import { SellerServices } from './sellers.service';

@Resolver()
export class SellerResolvers {
  constructor(private readonly sellerServices: SellerServices) {}

  @Query(() => [Seller])
  fetchSellers() {
    return this.sellerServices.findAll();
  }

  @Query(() => Seller)
  fetchSeller(
    @Args('sellerId') sellerId: string, //
  ) {
    return this.sellerServices.findOne({ sellerId });
  }

  @Mutation(() => Seller)
  createSeller(
    @Args('createsellerInput') createSellerInput: CreateSellerInput, //
  ) {
    return this.sellerServices.create({ createSellerInput });
  }
}
