import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { LikeRepository, PostRepository } from 'src/database/repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Like, Post } from '@schema';
import LikeSchema from 'src/database/schema/like.schema';
import PostSchema from 'src/database/schema/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Like.name, schema: LikeSchema },
      { name: Post.name, schema: PostSchema },
    ]),
  ],
  controllers: [LikeController],
  providers: [LikeService, LikeRepository, PostRepository],
})
export class LikeModule {}
