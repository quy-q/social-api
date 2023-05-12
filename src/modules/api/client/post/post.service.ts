import { HttpException, Injectable } from '@nestjs/common';
import { User } from '@schema';
import mongoose from 'mongoose';
import { CommentRepository, PostRepository } from 'src/database/repository';
import { FollowingRepository } from 'src/database/repository/following.repository copy';
import { CreatePostDto } from './dto/create-post.dto';
import { FiltersDto } from './dto/filters.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private commentRepository: CommentRepository,
    private followingRepository: FollowingRepository,
  ) {}

  /**
   *
   */
  async findAll(filters: FiltersDto): Promise<any[]> {
    return this.postRepository.pagination(
      {},
      filters.page,
      filters.limit,
      filters.orderBy,
    );
  }

  async create(createPostDto: CreatePostDto, user: User) {
    const post = this.postRepository.actionCreate({
      ...createPostDto,
      user: user._id,
    });
    if (!post) {
      throw new HttpException('Post cannot create', 402);
    }
    return post;
  }

  /**
   * get post by id
   * @param id
   * @returns
   */
  async findOne(id: string) {
    return await this.postRepository.findIdOrFail(id);
  }

  /**
   * update post by id
   * @param id
   * @param user
   * @returns
   */
  async update(id: string, updatePostDto: UpdatePostDto) {
    return await this.postRepository.actionFindByIdAndUpdate(id, updatePostDto);
  }

  /**
   * remove post by id
   * @param id
   * @returns
   */
  async remove(id: string) {
    await this.commentRepository.model.deleteMany({ post: id });
    return await this.postRepository.actionFindByIdAndDelete(id);
  }

  /**
   * post by Following
   * @param id
   * @returns
   */
  async postByFollowing(filters: FiltersDto, id: string) {
    console.log('id:', id);
    const user = await this.followingRepository.model.findOne({ user: id });
    console.log('user:', user);
    return await this.postRepository.pagination(
      { user: { $in: user.following } },
      filters.page,
      filters.limit,
      filters.orderBy,
    );
  }
}
