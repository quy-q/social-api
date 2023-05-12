import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { auth } from 'firebase-admin';
import { v4 as uuid } from 'uuid';
import { User, UserDocument } from '@schema';
import { AuthenticationBaseService } from '../../../../common/base/authenticationBase.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import DecodedIdToken = auth.DecodedIdToken;
import { UserService } from '../user/user.service';

@Injectable()
export class AuthenticationService extends AuthenticationBaseService {
  constructor(
    @InjectModel(User.name) public userModel: Model<UserDocument>,
    protected readonly jwtService: JwtService,
    protected readonly userService: UserService,
  ) {
    super(userModel, jwtService, userService);
  }

  /**
   *
   * @param user
   */
  public async getFirebaseUserInDatabase(user: DecodedIdToken) {
    console.log('user:', user);
    try {
      let user_data: any = await this.userModel.findOne({
        firebaseId: user.user_id,
      });

      if (!user_data) {
        user_data = await this.userModel.create({
          firebaseId: user.uid,
          email: user.email || '',
          isLoggin: true,
          avatar:
            user.avatar ||
            'https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-15.jpg',
        });
      }

      if (user_data && user_data.status !== true) {
        throw new NotFoundException('USER IS DISABLED');
      }
      return await this.login(user_data);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
