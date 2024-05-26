import { Category } from 'src/category/entities/category.entity';
import { Discount } from 'src/discount/entities/discount.entity';
import { PurchaseDetails } from 'src/purchase/entities/purchase-details.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn({ name: 'product_id' })
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  image: string;

  @ManyToOne(() => Category, (category) => category.product, {
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'category' })
  category: Category;

  @ManyToOne(() => Discount, (discount) => discount.product, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'discount' })
  discount: Discount;

  @OneToMany(
    () => PurchaseDetails,
    (purchaseDetails) => purchaseDetails.product,
  )
  purchaseDetails: PurchaseDetails[];
}
