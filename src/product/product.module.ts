import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoryModule } from 'src/category/category.module'

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  exports : [ProductService],
  imports: [TypeOrmModule.forFeature([Product]), CategoryModule]
})
export class ProductModule {}
