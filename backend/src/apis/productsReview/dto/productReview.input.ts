import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateReviewInput {
  @Field(() => String, { nullable: true })
  contents: string;

  @Field(() => [String], { nullable: true })
  image: string[];
}
