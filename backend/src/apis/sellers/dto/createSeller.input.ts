import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSellerInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: number;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  address: string;
}
