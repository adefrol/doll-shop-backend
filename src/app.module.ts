import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { FilesModule } from './files/files.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { PurchaseModule } from './purchase/purchase.module';
import { UsersModule } from './user/user.module';
import { CartModule } from './cart/cart.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { AuthModule } from './auth/auth.module';
import { DiscountModule } from './discount/discount.module'
import { CacheModule } from '@nestjs/cache-manager'
import { ScheduleModule } from '@nestjs/schedule'

@Module({
  imports: [
    OrderModule,
    CacheModule.register({ ttl: 0, isGlobal: true }),
    ScheduleModule.forRoot(),
    MulterModule.register({
      dest: join(__dirname, '..', 'public')
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        url: configService.get('DB_URL'),
        type: 'postgres',
        ssl: false,
        synchronize: true,
        entities: [__dirname + '/**/*.entity.{ts,js}'],
      }),
      inject: [ConfigService],
    }),
    FilesModule,
    CategoryModule,
    PurchaseModule,
    UsersModule,
    CartModule,
    WishlistModule,
    AuthModule,
    ProductModule,
    DiscountModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
