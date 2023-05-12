import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@schema';
import { Model } from 'mongoose';
import { UserRepository } from 'src/database/repository';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) public userModel: Model<UserDocument>,
    public userRepository: UserRepository,
  ) {}

  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  // async findAll() {
  //   return await this.userRepository.pagination({});
  // }

  async findOne(id: string) {
    return this.userModel.findOne({
      where: {
        _id: id,
      },
    });
  }

  async update(_id: string, updateUserDto: any) {
    return this.userModel.findOneAndUpdate(
      {
        _id,
      },
      updateUserDto,
      { returnDocument: 'after' },
    );
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
