import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';
import { Comment } from './comment.schema';
import { Type } from 'class-transformer';
export type PostDocument = Post & Document;

@Schema({
  collection: 'Post',
})
export class Post {
  _id: string;

  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    autopopulate: true,
  })
  user: User;

  @Prop({ type: Number, required: true, default: 0 })
  countLike: number;

  @Prop({ type: Number, required: true, default: 0 })
  countComment: number;

  @Prop({ type: String })
  upload: string;

  @Prop({ type: String })
  type: string;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Comment.name,
        autopopulate: true,
      },
    ],
  })
  @Type(() => Comment)
  comments: Comment;

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
const PostSchema = SchemaFactory.createForClass(Post);
export default PostSchema;
