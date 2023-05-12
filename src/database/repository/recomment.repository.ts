import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recomment, RecommentDocument } from '../schema/recomment.schema';

@Injectable()
export class RecommentRepository extends BaseService<RecommentDocument> {
  constructor(
    @InjectModel(Recomment.name)
    public model: Model<RecommentDocument>,
  ) {
    super(model);
  }
}
