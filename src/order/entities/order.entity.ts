import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Order {
    @PrimaryGeneratedColumn({ name: 'order_id'})
    id?: number;

    @Column()
    name: string;

    @Column()
    type_order: string;

    @Column() 
    last_name:string;

    @Column() 
    email:string;

    @Column()   
    phone: string;

    @Column()
    address: string;

    @Column({nullable: true})
    image: string;

    @Column()
    message: string;

    @CreateDateColumn()
    created_at: Date;
} 