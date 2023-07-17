import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Chatting } from './chatting.schema';
import { Post } from './post.schema';
import { User } from './user.schema';

export type ConversationDocument = Conversation & Document;

@Schema({
  collection: 'Conversation',
})
export class Conversation {
  _id: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    autopopulate: true,
  })
  sender: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    autopopulate: true,
  })
  recipient: User;

  @Prop({
    type: String,
    required: true,
  })
  lastMessage: string;

  @Prop({
    type: Date,
    required: true,
  })
  lastActivity: Date;

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
const ConversationSchema = SchemaFactory.createForClass(Conversation);
export default ConversationSchema;
