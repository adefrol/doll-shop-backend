import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from './entities/order.entity'

@Module({
  controllers: [OrderController],
  exports: [OrderService],
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [OrderService]
})
export class OrderModule {}
