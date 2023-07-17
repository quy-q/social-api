import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrdersRepository, ProductRepository } from 'src/database/repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Product } from '@schema';
import OrderSchema from 'src/database/schema/order.schema';
import ProductSchema from 'src/database/schema/product.schema';
import { Order } from 'src/database/schema/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrdersRepository, ProductRepository],
})
export class OrderModule {}
