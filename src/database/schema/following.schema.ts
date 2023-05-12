import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Post } from './post.schema';
import { User } from './user.schema';
export type FollowingDocument = Following & Document;

@Schema({
  collection: 'Following',
})
export class Following {
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: User.name }])
  following: User;

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
const FollowingSchema = SchemaFactory.createForClass(Following);
export default FollowingSchema;
