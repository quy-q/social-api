import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import StripeService from 'src/common/helper/stripe/stripe.service';
import { MongooseModule } from '@nestjs/mongoose';
import OrderSchema, { Order } from 'src/database/schema/order.schema';
import ProductSchema, { Product } from 'src/database/schema/product.schema';
import { OrdersRepository } from 'src/database/repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, StripeService, OrdersRepository],
})
export class PaymentModule {}
