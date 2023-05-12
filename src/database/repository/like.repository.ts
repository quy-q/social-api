import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base';
import { Like, LikeDocument, User } from '../schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LikeRepository extends BaseService<LikeDocument> {
  constructor(
    @InjectModel(Like.name)
    public model: Model<LikeDocument>,
  ) {
    super(model);
  }

  checkExistLikeOfUser = async (user: User, idPost: string): Promise<Like> =>
    this.model.findOne({ user: user._id, post: idPost });
}
