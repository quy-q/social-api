import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Comment } from './comment.schema';
import { User } from './user.schema';
import { ProductCategory } from './product-category.schema';
import { Promo } from './promo.schema';
export type OrderDocument = Order & Document;

@Schema({
  collection: 'Order',
})
export class Order {
  _id: string;

  @Prop({ type: Number, required: true, default: 1 })
  quantity: number;

  @Prop({ type: String })
  promo: Promo;

  @Prop({ type: Number, required: true })
  cost: number;

  @Prop({ type: ['PAID' || 'PENDING'], required: true, default: 'PENDING' })
  type: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;

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
const OrderSchema = SchemaFactory.createForClass(Order);
export default OrderSchema;
