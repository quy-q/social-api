import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { User } from '@schema';
import mongoose from 'mongoose';
import { CommentRepository } from 'src/database/repository';
import { RecommentRepository } from 'src/database/repository/recomment.repository';
import { CreateRecommentDto } from './dto/create-recomment.dto';
import { UpdateRecommentDto } from './dto/update-recomment.dto';

@Injectable()
export class RecommentService {
  constructor(
    private recommentRepository: RecommentRepository,
    private commentRepository: CommentRepository,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async create(
    createRecommentDto: CreateRecommentDto,
    user: User,
    idCmt: string,
  ) {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const reComment = await this.recommentRepository.actionCreate({
        ...createRecommentDto,
        user: user._id,
        comment: idCmt,
      });
      await this.commentRepository.model
        .updateOne({ _id: idCmt }, { $push: { reComments: reComment._id } })
        .session(session);
      await session.commitTransaction();
      return reComment;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async update(id: string, updateRecommentDto: UpdateRecommentDto) {
    return await this.recommentRepository.actionFindByIdAndUpdate(
      id,
      updateRecommentDto,
    );
  }
  async remove(id: string) {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      await this.commentRepository.model
        .updateOne(
          {
            reComments: {
              $in: id,
            },
          },
          { $pull: { reComments: id } },
        )
        .session(session);
      const deleteReComment = await this.recommentRepository.deleteById(id);
      await session.commitTransaction();
      return deleteReComment;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}
