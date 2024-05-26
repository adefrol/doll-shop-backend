import { Product } from 'src/product/entities/product.entity'
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Category {
    @PrimaryGeneratedColumn({ name: 'category_id' })
    id: number;
  
    @Column()
    name: string;
    
    @OneToMany(() => Product, (product) => product.category, {onUpdate: "NO ACTION"})
    @JoinColumn({name: 'product'})
    product: Product[]
}
