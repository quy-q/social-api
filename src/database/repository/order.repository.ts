import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../schema/orther.schema';

@Injectable()
export class OrderRepository extends BaseService<OrderDocument> {
  constructor(
    @InjectModel(Order.name)
    public model: Model<OrderDocument>,
  ) {
    super(model);
  }
}
