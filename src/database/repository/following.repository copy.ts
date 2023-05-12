import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Following, FollowingDocument } from '../schema/following.schema';

@Injectable()
export class FollowingRepository extends BaseService<FollowingDocument> {
  constructor(
    @InjectModel(Following.name)
    public model: Model<FollowingDocument>,
  ) {
    super(model);
  }
}
