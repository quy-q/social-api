import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { OrdersRepository } from 'src/database/repository';
import { InjectConnection } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import StripeService from 'src/common/helper/stripe/stripe.service';

@Injectable()
export class PaymentService {
  constructor(
    private orderRepository: OrdersRepository,
    private stripe: StripeService,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async payment(createPaymentDto: CreatePaymentDto) {
    //const payment = this.stripe.createCustomer();
  }
}
