import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateSellerInput } from './createSeller.input';

@InputType()
export class UpdateSellerInput extends PartialType(CreateSellerInput) {}
