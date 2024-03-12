import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';
import { Product } from './product.schema';

export type OrderDocument = Order & Document;

@Schema({
  collection: 'Order',
})
export class Order {
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Product.name })
  productId: Product;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: String })
  phoneNumber: string;

  @Prop({ type: String })
  address: string;

  @Prop({ type: String })
  userName: string;

  @Prop({ type: String })
  district: string;

  @Prop({ type: String })
  province: string;

  @Prop({ type: Number, required: true, default: 1 })
  quantity: number;

  @Prop({ type: String, required: true, default: 'ORDER' })
  type: 'PAID' | 'ORDER';

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
