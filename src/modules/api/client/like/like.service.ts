import { Injectable } from '@nestjs/common';
import { User } from '@schema';
import { LikeRepository, PostRepository } from 'src/database/repository';
import { InjectConnection } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
@Injectable()
export class LikeService {
  constructor(
    private likeRepository: LikeRepository,
    private postRepository: PostRepository,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  /**
   *
   * @param id
   * @param user
   */
  async like(idPost: string, user: User) {
    const checkExistLike = await this.likeRepository.checkExistLikeOfUser(
      user,
      idPost,
    );
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      if (checkExistLike) {
        console.log('22222222222', checkExistLike);
        await this.postRepository.decrCountLikePost(idPost);
        await this.likeRepository.actionFindByIdAndDelete(checkExistLike._id);
        const post = await this.postRepository.actionFindById(idPost);
        await session.commitTransaction();
        return { post, message: 'Bạn đã bỏ thích bài viết' };
      }
      await this.postRepository.incCountLikePost(idPost);
      await this.likeRepository.actionCreate({ user: user._id, post: idPost });
      await session.commitTransaction();
      const post = await this.postRepository.actionFindById(idPost);
      return { post, message: 'Bạn đã thích bài viết' };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async checkLiked(idPost: string, user) {
    return await this.likeRepository.model.find({
      post: idPost,
      user: user._id,
    });
  }
}
