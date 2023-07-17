import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../schema/order.schema';

@Injectable()
export class OrdersRepository extends BaseService<OrderDocument> {
  constructor(
    @InjectModel(Order.name)
    public model: Model<OrderDocument>,
  ) {
    super(model);
  }
}
