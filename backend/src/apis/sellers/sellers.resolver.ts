import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IContext } from 'src/commons/type/context';
import { CreateSellerInput } from './dto/createSeller.input';
import { UpdateSellerInput } from './dto/updateSeller.input';
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

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Seller)
  updateSeller(
    @Args('updateSellerInput') updateSellerInput: UpdateSellerInput, //
    @Context() context: IContext,
  ) {
    const email = context.req.user.email;

    return this.sellerServices.update({ email, updateSellerInput });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteSeller(
    @Context() context: IContext, //
  ) {
    const email = context.req.user.email;

    return (await this.sellerServices.delete({ email })).affected;
  }
}
