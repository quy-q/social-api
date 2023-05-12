import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { BaseService } from './base.service';
import { User, UserDocument } from '@schema';

import { UserService } from 'src/modules/api/client/user/user.service';

interface TokenPayload {
  userId: string;
}

Injectable();
export class AuthenticationBaseService extends BaseService {
  constructor(
    @InjectModel(User.name) public userModel: Model<UserDocument>,
    protected readonly jwtService: JwtService,
    protected readonly userService: UserService,
  ) {
    super(userModel);
  }

  public async getUserFromAuthenticationToken(token: string) {
    const payload: TokenPayload = this.jwtService.verify(token, {
      secret: process.env.JWTKEY,
    });
    if (payload.userId) {
      return this.userService.findOne(payload.userId);
    }
  }

  /**
   *
   * @param user
   */
  public async login(user: User) {
    console.log('user:', user);
    const encode = {
      _id: user['_id'],
      username: user.username,
      avatar: user.avatar,
    };

    const accessToken = await this.generateToken(encode);
    const refreshToken = this.jwtService.sign(encode, this.getTokenOptions());
    await this.setCurrentRefreshToken(refreshToken, user['_id'].toString());
    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  /**
   *
   * @param refreshToken
   * @param userId
   */
  public async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    return await this.actionFindByIdAndUpdate(userId, {
      refreshToken: currentHashedRefreshToken,
      lastLogin: new Date(),
    });
  }

  /**
   *
   * @param user
   * @private
   */
  private async generateToken(user) {
    return this.jwtService.sign(user, {
      secret: process.env.JWTKEY,
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
  }

  /**
   *
   * @private
   */
  private getTokenOptions() {
    const options: JwtSignOptions = {
      secret: process.env.JWTKEY,
    };
    const expiration: string = process.env.REFRESH_TOKEN_EXPIRATION;
    if (expiration) {
      options.expiresIn = expiration;
    }
    return options;
  }
}
