import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entities/product.entity';
import { ProductReviewImage } from 'src/apis/productsReviewImage/entities/productReviewImage.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class ProductReview {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { nullable: true })
  id: string;

  @Column()
  @Field(() => String, { nullable: true })
  contents: string;

  @CreateDateColumn()
  @Field(() => String, { nullable: true })
  createdAt: Date;

  @ManyToOne(() => Product, { nullable: true })
  @Field(() => Product)
  product: Product;

  @ManyToOne(() => User)
  @Field(() => User, { nullable: true })
  user: User;

  @OneToMany(() => ProductReviewImage, (image) => image.review)
  @Field(() => [ProductReviewImage], { nullable: true })
  image: ProductReviewImage[];
}
