import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Comment } from './comment.schema';
import { User } from './user.schema';
export type PromoDocument = Promo & Document;

@Schema({
  collection: 'Promo',
})
export class Promo {
  _id: string;

  @Prop({ type: Number, required: true, default: 1 })
  quantity: number;

  @Prop({ type: Number, required: true })
  percent: number;

  @Prop({ type: Number, required: true })
  price: number;

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
const PromoSchema = SchemaFactory.createForClass(Promo);
export default PromoSchema;
