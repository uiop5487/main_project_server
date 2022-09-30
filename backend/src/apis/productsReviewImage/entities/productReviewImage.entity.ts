import { Field, ObjectType } from '@nestjs/graphql';
import { ProductReview } from 'src/apis/productsReview/entities/productReview.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class ProductReviewImage {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { nullable: true })
  id: string;

  @Column()
  @Field(() => String, { nullable: true })
  url: string;

  @ManyToOne(() => ProductReview, (review) => review.image)
  @Field(() => ProductReview, { nullable: true })
  review: ProductReview;
}
