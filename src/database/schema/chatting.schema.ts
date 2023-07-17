import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Post } from './post.schema';
import { User } from './user.schema';
import { Conversation } from './conversation.schema';
export type ChattingDocument = Chatting & Document;

@Schema({
  collection: 'Chatting',
})
export class Chatting {
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  sender: User;

  @Prop({
    type: String,
    required: true,
  })
  message: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  recipient: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Conversation.name,
    required: true,
  })
  conversation: Conversation;

  @Prop({ type: String, required: true, default: 'NORMAL' })
  type: 'NORMAL' | 'HIDE';

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
const ChattingSchema = SchemaFactory.createForClass(Chatting);
export default ChattingSchema;
