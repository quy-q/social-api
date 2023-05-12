import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentRepository, PostRepository } from 'src/database/repository';
import { MongooseModule } from '@nestjs/mongoose';
import CommentSchema, { Comment } from 'src/database/schema/comment.schema';
import PostSchema, { Post } from 'src/database/schema/post.schema';
import { Recomment } from '@schema';
import RecommentSchema from 'src/database/schema/recomment.schema';
import { RecommentRepository } from 'src/database/repository/recomment.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: Post.name, schema: PostSchema },
      { name: Recomment.name, schema: RecommentSchema },
    ]),
  ],
  controllers: [CommentController],
  providers: [
    CommentService,
    CommentRepository,
    PostRepository,
    RecommentRepository,
  ],
})
export class CommentModule {}
