import { Field, ObjectType } from '@nestjs/graphql';
import { ProductMainCategory } from 'src/apis/productsMainCategory/entities/productMainCategory.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductSubCategory {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { nullable: true })
  id: string;

  @Column({ unique: true })
  @Field(() => String, { nullable: true })
  name: string;

  @ManyToOne(() => ProductMainCategory)
  @Field(() => ProductMainCategory, { nullable: true })
  maincategory: ProductMainCategory;
}
