import { Field, ObjectType } from '@nestjs/graphql';
import { ProductInquiry } from 'src/apis/productsInquiry/entities/productInquiry.entity';
import { Seller } from 'src/apis/sellers/entities/seller.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class ProductInquiryAnswer {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { nullable: true })
  id: string;

  @Column()
  @Field(() => String, { nullable: true })
  contents: string;

  @CreateDateColumn()
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @ManyToOne(() => ProductInquiry)
  @Field(() => ProductInquiry, { nullable: true })
  inquiry: ProductInquiry;

  @ManyToOne(() => Seller)
  @Field(() => Seller, { nullable: true })
  seller: Seller;
}
