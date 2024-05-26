import { Category } from 'src/category/entities/category.entity'

export class CreateProductDto {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: Category
}
