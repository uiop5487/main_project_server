import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Seller {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { nullable: true })
  id: string;

  @Column()
  @Field(() => String, { nullable: true })
  name: string;

  @Column()
  @Field(() => String, { nullable: true })
  email: string;

  @Column()
  // @Field(() => String)
  password: string;

  @Column()
  @Field(() => String, { nullable: true })
  phone: string;

  @Column()
  @Field(() => String, { nullable: true })
  address: string;
}
