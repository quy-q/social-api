import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Post } from './post.schema';
import { User } from './user.schema';
export type LikeDocument = Like & Document;

@Schema({
  collection: 'Like',
})
export class Like {
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: Post.name,
  })
  post: Post;

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
const LikeSchema = SchemaFactory.createForClass(Like);
export default LikeSchema;
