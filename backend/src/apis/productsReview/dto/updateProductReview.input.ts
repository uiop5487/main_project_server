import { InputType, PartialType } from '@nestjs/graphql';
import { CreateReviewInput } from './productReview.input';

@InputType()
export class UpdateReviewInput extends PartialType(CreateReviewInput) {}
