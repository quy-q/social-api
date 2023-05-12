import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schema/product.schema';
import {
  ProductCategory,
  ProductCategoryDocument,
} from '../schema/product-category.schema';

@Injectable()
export class ProductCategoryRepository extends BaseService<ProductCategoryDocument> {
  constructor(
    @InjectModel(ProductCategory.name)
    public model: Model<ProductCategoryDocument>,
  ) {
    super(model);
  }
}
