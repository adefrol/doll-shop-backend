import { Body, Controller, Get, HttpCode, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { OrderService } from './order.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) { }

    @HttpCode(HttpStatus.OK)
    @Get()
    findAll() {
        return this.orderService.findAll()
    }

    @HttpCode(HttpStatus.OK)
    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.orderService.create(createOrderDto)
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file)
    }

}
