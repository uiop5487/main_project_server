import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { ProductTag } from 'src/apis/productsTags/entities/productTag.entity';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  contents: string;

  @Min(0)
  @Field(() => Int)
  price: number;

  @Field(() => String)
  unit: string;

  @Field(() => String)
  volume: string;

  @Field(() => String)
  origin: string;

  @Field(() => [String], { nullable: true })
  productImage: string[];

  @Field(() => String, { nullable: true })
  productCategoryId: string;

  @Field(() => String, { nullable: true })
  productTypeId: string;

  @Field(() => String, { nullable: true })
  sellerId: string;

  @Field(() => [String], { nullable: true })
  tags: string[];
}
