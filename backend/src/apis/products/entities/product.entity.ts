import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductImage } from 'src/apis/productsImage/entities/productImage.entity';
import { ProductSubCategory } from 'src/apis/productsSubCategory/entities/productSubCategory.entity';
import { ProductSubType } from 'src/apis/productsSubType/entities/productSubType.entity';
import { ProductTag } from 'src/apis/productsTags/entities/productTag.entity';
import { Seller } from 'src/apis/sellers/entities/seller.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
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
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  contents: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column()
  @Field(() => String)
  unit: string;

  @Column()
  @Field(() => String)
  volume: string;

  @Column()
  @Field(() => String)
  origin: string;

  @Column({ default: false })
  @Field(() => Boolean)
  isSoldout: boolean;

  @Column({ default: false })
  @Field(() => Boolean)
  isBest: boolean;

  @Column({ default: false })
  @Field(() => Boolean)
  isNew: boolean;

  @Field(() => [String])
  productImage: string[];

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => ProductSubCategory)
  @Field(() => ProductSubCategory)
  category: ProductSubCategory;

  @ManyToOne(() => ProductSubType)
  @Field(() => ProductSubType)
  type: ProductSubType;

  @JoinTable()
  @ManyToMany(() => ProductTag, (ProductTag) => ProductTag.products)
  @Field(() => [ProductTag])
  tags: ProductTag[];

  @ManyToOne(() => Seller)
  @Field(() => Seller)
  seller: Seller;
}
