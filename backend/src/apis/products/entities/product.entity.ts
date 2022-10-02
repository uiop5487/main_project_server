import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductSubCategory } from 'src/apis/productsSubCategory/entities/productSubCategory.entity';
import { ProductSubType } from 'src/apis/productsSubType/entities/productSubType.entity';
import { ProductTag } from 'src/apis/productsTags/entities/productTag.entity';
import { Seller } from 'src/apis/sellers/entities/seller.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String, { nullable: true })
  name: string;

  @Column()
  @Field(() => String, { nullable: true })
  contents: string;

  @Column()
  @Field(() => Int, { nullable: true })
  price: number;

  @Column()
  @Field(() => String, { nullable: true })
  unit: string;

  @Column()
  @Field(() => String, { nullable: true })
  volume: string;

  @Column()
  @Field(() => String, { nullable: true })
  origin: string;

  @Column({ default: false })
  @Field(() => Boolean, { nullable: true })
  isSoldout: boolean;

  @Column({ default: false })
  @Field(() => Int, { nullable: true })
  isPickedCount: number;

  @Field(() => [String], { nullable: true })
  productImage: string[];

  @CreateDateColumn()
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => ProductSubCategory)
  @Field(() => ProductSubCategory, { nullable: true })
  category: ProductSubCategory;

  @ManyToOne(() => ProductSubType)
  @Field(() => ProductSubType, { nullable: true })
  type: ProductSubType;

  @JoinTable()
  @ManyToMany(() => ProductTag, (ProductTag) => ProductTag.products)
  @Field(() => [ProductTag], { nullable: true })
  tags: ProductTag[];

  @ManyToOne(() => Seller)
  @Field(() => Seller, { nullable: true })
  seller: Seller;
}
