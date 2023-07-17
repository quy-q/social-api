import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import ConversationSchema, {
  Conversation,
} from 'src/database/schema/conversation.schema';
import { ConversationRepository } from 'src/database/repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
    ]),
  ],
  controllers: [ConversationController],
  providers: [ConversationService, ConversationRepository],
})
export class ConversationModule {}
