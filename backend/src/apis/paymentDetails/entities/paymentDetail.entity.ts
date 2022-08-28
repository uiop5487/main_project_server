import { Payment } from 'src/apis/payment/entities/payment.entity';
import { Product } from 'src/apis/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PaymentDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  state: string;

  @Column()
  createdAt: Date;

  @Column()
  deletedAt: Date;

  @ManyToOne(() => Payment)
  payment: Payment;

  @ManyToOne(() => Product)
  product: Product;
}
