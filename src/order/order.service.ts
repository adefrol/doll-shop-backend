import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Order } from './entities/order.entity'
import { Repository } from 'typeorm'
import { CreateOrderDto } from './dto/create-order.dto'

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>
    )  {}

    async create(createOrderDto: CreateOrderDto) {
        const newOrder = {
            name: createOrderDto.name,
            last_name: createOrderDto.last_name,
            type_order: createOrderDto.type_order,
            email: createOrderDto.email,
            address: createOrderDto.address,
            message: createOrderDto.message,
            phone: createOrderDto.phone
        }
        if (!newOrder) return new BadRequestException()

        return await this.orderRepository.save(newOrder)
    }

    async findAll() {
        return await this.orderRepository.find()
    }
}
