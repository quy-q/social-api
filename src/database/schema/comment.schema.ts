import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Post } from './post.schema';
import { Recomment } from './recomment.schema';
import { User } from './user.schema';
export type CommentDocument = Comment & Document;

@Schema({
  collection: 'Comment',
})
export class Comment {
  _id: string;

  @Prop({ type: String, required: true })
  text: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    autopopulate: true,
  })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  post: Post;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Recomment.name,
        autopopulate: true,
      },
    ],
  })
  @Type(() => Recomment)
  reComments: Recomment;

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
const CommentSchema = SchemaFactory.createForClass(Comment);
export default CommentSchema;
