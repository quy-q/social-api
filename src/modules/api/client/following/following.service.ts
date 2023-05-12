import { Injectable } from '@nestjs/common';
import { User } from '@schema';
import { UserDecorator } from 'src/common/decorator';
import { FollowingRepository } from 'src/database/repository/following.repository copy';
import { CreateFollowingDto } from './dto/create-following.dto';
import { UpdateFollowingDto } from './dto/update-following.dto';

@Injectable()
export class FollowingService {
  constructor(private following: FollowingRepository) {}
  async create(@UserDecorator() user: User, id: string) {
    const userFollowing = await this.following.model.findOne({
      user: user._id,
    });
    if (userFollowing) {
      return await this.following.model.updateOne(
        { _id: user._id },
        { $push: { following: id } },
      );
    }
    return await this.following.actionCreate({ user: user._id, following: id });
  }

  async findAll() {
    return this.following.model.find().populate('following');
  }

  findOne(id: number) {
    return `This action returns a #${id} following`;
  }

  update(id: number, updateFollowingDto: UpdateFollowingDto) {
    return `This action updates a #${id} following`;
  }

  remove(id: number) {
    return `This action removes a #${id} following`;
  }
}
