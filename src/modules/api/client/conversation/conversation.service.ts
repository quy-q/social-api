import { HttpException, Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { User } from '@schema';
import { ConversationRepository } from 'src/database/repository';

@Injectable()
export class ConversationService {
  constructor(private conversationRepository: ConversationRepository) {}

  async create(createProductDto: CreateConversationDto, user: User) {
    const post = await this.conversationRepository.actionCreate({
      ...createProductDto,
      user: user._id,
    });
    if (!post) {
      throw new HttpException('Post cannot create', 402);
    }
    return post;
  }

  /**
   * get all post by user
   * @param user
   * @returns
   */
  async findAll(user: User) {
    return await this.conversationRepository.findIdOrFail(user._id);
  }

  /**
   * get all post by user
   * @param user
   * @returns
   */
  async findConversation(user: User) {
    return await this.conversationRepository.findIdOrFail(user._id);
  }

  /**
   * get post by id
   * @param id
   * @returns
   */
  async findOne(id: string) {
    return await this.conversationRepository.findIdOrFail(id);
  }

  /**
   * update market by id
   * @param id
   * @param user
   * @returns
   */
  async update(id: string, updateMarketDto: UpdateConversationDto) {
    return await this.conversationRepository.actionFindByIdAndUpdate(
      id,
      updateMarketDto,
    );
  }

  /**
   * remove post by id
   * @param id
   * @returns
   */
  async remove(id: string) {
    await this.conversationRepository.model.deleteMany({ post: id });
    return await this.conversationRepository.actionFindByIdAndDelete(id);
  }
}
