import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Comment } from './comment.schema';
import { Post } from './post.schema';
import { User } from './user.schema';
export type MarketDocument = Market & Document;

@Schema({
  collection: 'Market',
})
export class Market {
  _id: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop([{ type: String, required: true }])
  image: [string];

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Comment.name })
  comment: Comment;

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
const MarketSchema = SchemaFactory.createForClass(Market);
export default MarketSchema;
