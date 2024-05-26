import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

/*   @UseGuards(JwtAuthGuard) */
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const result = {
      data: await this.orderService.create(createOrderDto),
      status: 200,
    };
    return result;
  }
}
