import { Module } from '@nestjs/common';
import { RecommentService } from './recomment.service';
import { RecommentController } from './recomment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import RecommentSchema, {
  Recomment,
} from 'src/database/schema/recomment.schema';
import { RecommentRepository } from 'src/database/repository/recomment.repository';
import { Comment } from '@schema';
import CommentSchema from 'src/database/schema/comment.schema';
import { CommentRepository } from 'src/database/repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Recomment.name, schema: RecommentSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
  ],
  controllers: [RecommentController],
  providers: [RecommentService, RecommentRepository, CommentRepository],
})
export class RecommentModule {}
