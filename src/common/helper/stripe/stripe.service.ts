import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import Stripe from 'stripe';

@Injectable()
export default class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET, {
      apiVersion: '2022-11-15',
      appInfo: {
        // For sample support and debugging, not required for production:
        name: 'stripe-samples/accept-a-payment',
        url: 'https://github.com/stripe-samples',
        version: '0.0.2',
      },
      typescript: true,
    });
  }

  public async createCustomer(name: string, email: string) {
    const customer = await this.stripe.customers.create({
      name,
      email,
    });
    if (!customer.id) {
      throw new ExceptionsHandler();
    }
    return customer.id;
  }

  public async createPaymentIntent(amount: number, customerId: string) {
    return this.stripe.paymentIntents.create({
      amount,
      customer: customerId,
      payment_method_types: ['card'],
      currency: process.env.STRIPE_CURRENCY,
      confirm: true,
    });
  }
}
