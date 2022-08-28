import { ProductReview } from 'src/apis/productsReview/entities/productReview.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductReviewImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @ManyToOne(() => ProductReview)
  review: ProductReview;
}
