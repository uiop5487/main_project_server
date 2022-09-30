import { Field } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entities/product.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
}
