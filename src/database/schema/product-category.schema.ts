import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Comment } from './comment.schema';
import { User } from './user.schema';
export type ProductCategoryDocument = ProductCategory & Document;

@Schema({
  collection: 'ProductCategory',
})
export class ProductCategory {
  _id: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;

  @Prop({
    type: Date,
    default: Date.now,
  })
  updatedAt: Date;
}
const ProductCategorySchema = SchemaFactory.createForClass(ProductCategory);
export default ProductCategorySchema;
