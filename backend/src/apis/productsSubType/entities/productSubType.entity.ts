import { Field, ObjectType } from '@nestjs/graphql';
import { ProductMainType } from 'src/apis/productsMainType/entities/productMainType.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductSubType {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { nullable: true })
  id: string;

  @Column()
  @Field(() => String, { nullable: true })
  name: string;

  @ManyToOne(() => ProductMainType)
  @Field(() => ProductMainType, { nullable: true })
  maintype: ProductMainType;
}
