import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base';
import { Comment, CommentDocument } from '../schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CommentRepository extends BaseService<CommentDocument> {
  constructor(
    @InjectModel(Comment.name)
    public model: Model<CommentDocument>,
  ) {
    super(model);
  }
}
