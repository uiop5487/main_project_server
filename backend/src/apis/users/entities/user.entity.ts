import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
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
  password: string;

  @Column()
  @Field(() => String, { nullable: true })
  phone: string;

  @Column()
  @Field(() => String, { nullable: true })
  address: string;

  @Column()
  @Field(() => String, { nullable: true })
  rank: string;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  point: number;

  @CreateDateColumn()
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
}
