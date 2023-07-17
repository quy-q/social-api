import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Comment } from './comment.schema';
import { User } from './user.schema';
import { Type } from 'class-transformer';
import { ProductCategory } from './product-category.schema';
export type ProductDocument = Product & Document;

@Schema({
  collection: 'Product',
})
export class Product {
  _id: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop([{ type: String, required: true }])
  image: [string];

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  productName: string;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: ProductCategory.name })
  productCategory: ProductCategory;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Comment.name,
      },
    ],
  })
  @Type(() => Comment)
  comments: Comment;

  @Prop({ type: String, required: true })
  province: string;

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
const ProductSchema = SchemaFactory.createForClass(Product);
export default ProductSchema;
