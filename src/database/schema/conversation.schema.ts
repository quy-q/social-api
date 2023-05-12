import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Chatting } from './chatting.schema';
import { Post } from './post.schema';

export type ConversationDocument = Conversation & Document;

@Schema({
  collection: 'Conversation',
})
export class Conversation {
  _id: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  chatId: Chatting;

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
