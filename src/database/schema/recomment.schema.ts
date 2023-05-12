import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Comment } from './comment.schema';
import { User } from './user.schema';
export type RecommentDocument = Recomment & Document;

@Schema({
  collection: 'Recomment',
})
export class Recomment {
  _id: string;

  @Prop({ type: String, required: true })
  text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' })
  comment: Comment;

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
const RecommentSchema = SchemaFactory.createForClass(Recomment);
export default RecommentSchema;
