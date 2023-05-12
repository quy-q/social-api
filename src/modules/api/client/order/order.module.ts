import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import OrderSchema, { Order } from 'src/database/schema/orther.schema';
import { OrderRepository } from 'src/database/repository/order.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
