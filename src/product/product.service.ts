import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Discount } from 'src/discount/entities/discount.entity';
import { CategoryService } from 'src/category/category.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private categoryService: CategoryService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const newProduct = {
      name: createProductDto.name,
      description: createProductDto.description,
      price: createProductDto.price,
      image: createProductDto.image,
      category: createProductDto.category,
    };

    if (!newProduct) throw new NotFoundException('something went wrong');

    const product = await this.productRepository.save(newProduct);
    await this.cacheManager.del('product');
    return product;
  }

  async findAll() {
    const product = await this.productRepository.find({
      relations: { category: true, discount: true },
    });

    if (!product) throw new NotFoundException('Не найдено');

    return product;
  }

  async findOne(id: number) {
    const product = await this.productRepository.find({
      where: { id },
      relations: { category: true },
    });

    if (!product) throw new NotFoundException('Не найдено');

    return product;
  }

  async findOneWithoutRelation(id: number) {
    return await this.productRepository.findOne({ where: { id } });
  }

  async update(updateProductDto: UpdateProductDto) {
    await this.productRepository.save(
      updateProductDto,
    );
    await this.cacheManager.del('product');
  }

  async remove(id: number) {
    await this.productRepository.delete(await this.findOneWithoutRelation(id));
    await this.cacheManager.del('product');
  }

  async findByCategory(categoryId: number) {
    try {
      const products = await this.productRepository.find({
        where: { category: await this.categoryService.findOne(categoryId) },
        relations: { discount: true },
      });
      return products;
    } catch (e) {
      throw new NotFoundException(e, 'Не найдены товары для применения скидки');
    }
  }

  async createDiscount(id: number, discount: Discount, discountType: string) {
    const typeSelect = async () => {
      if (discountType == 'category') {
        return await this.findByCategory(id);
      }
      if (discountType == 'one') {
        return await this.findOne(id);
      }
    };

    const products = (await typeSelect()).filter((product) => {
      if (product.discount) {
        if (product.discount.discount_value < discount.discount_value) {
          return true;
        }
      } else {
        return true;
      }
    });
    console.log(products);

    try {
      return await this.productRepository.update(
        products.map((product) => product.id),
        { discount: discount },
      );
    } catch (e) {
      throw new NotFoundException('Не найдены товары для применения скидки1');
    }
  }
}
