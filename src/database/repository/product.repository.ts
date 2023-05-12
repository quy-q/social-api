import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schema/product.schema';

@Injectable()
export class ProductRepository extends BaseService<ProductDocument> {
  constructor(
    @InjectModel(Product.name)
    public model: Model<ProductDocument>,
  ) {
    super(model);
  }
}
