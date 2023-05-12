import { Module } from '@nestjs/common';
import { FollowingService } from './following.service';
import { FollowingController } from './following.controller';
import { MongooseModule } from '@nestjs/mongoose';
import FollowingSchema, {
  Following,
} from 'src/database/schema/following.schema';
import { FollowingRepository } from 'src/database/repository/following.repository copy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Following.name, schema: FollowingSchema },
    ]),
  ],
  controllers: [FollowingController],
  providers: [FollowingService, FollowingRepository],
})
export class FollowingModule {}
