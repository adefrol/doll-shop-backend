import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { OrderModule } from './order/order.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [OrderModule,
    ConfigModule.forRoot({ isGlobal: true, }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        url: configService.get('DB_URL'),
        type: 'postgres',
        ssl: true,
        synchronize: true,
        entities: [__dirname + '/**/*.entity.{ts,js}']
      }),
      inject: [ConfigService]
    }),],


  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule { }
