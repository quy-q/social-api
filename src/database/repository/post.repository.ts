import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base';
import { Post, PostDocument } from '../schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class PostRepository extends BaseService<PostDocument> {
  constructor(
    @InjectModel(Post.name)
    public model: Model<PostDocument>,
  ) {
    super(model);
  }
  /**
   *
   * @param itemId
   */
  async findIdOrFail(itemId: string) {
    const item = await this.model
      .findOne({ user: itemId })
      .populate('comments');

    if (!item)
      throw new HttpException(
        {
          message: `item ${this.model.name} do not exists `,
        },
        HttpStatus.NOT_FOUND,
      );
    return item;
  }

  /**
   *
   * @param id
   * @returns
   */
  async incCountLikePost(
    id: string,
    session: mongoose.ClientSession | null = null,
  ) {
    return this.model
      .findOneAndUpdate(
        { _id: id },
        {
          $inc: { countLike: 1 },
        },
        { new: true },
      )
      .session(session);
  }

  /**
   *
   * @param id
   * @returns
   */
  async decrCountLikePost(
    id: string,
    session: mongoose.ClientSession | null = null,
  ) {
    return await this.model
      .findOneAndUpdate(
        { _id: id },
        {
          $inc: { countLike: -1 },
        },
        { new: true },
      )
      .session(session);
  }
}
