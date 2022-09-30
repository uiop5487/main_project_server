import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entities/product.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class ProductInquiry {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { nullable: true })
  id: string;

  @Column()
  @Field(() => String, { nullable: true })
  contents: string;

  @CreateDateColumn()
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @ManyToOne(() => Product)
  @Field(() => Product, { nullable: true })
  product: Product;

  @ManyToOne(() => User)
  @Field(() => User, { nullable: true })
  user: User;
}
