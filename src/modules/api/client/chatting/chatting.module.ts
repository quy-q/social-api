import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from '@schema';
import { AuthenticationBaseService } from 'src/common/base';
import {
  ChattingRepository,
  ConversationRepository,
  UserRepository,
} from 'src/database/repository';
import ChattingSchema, { Chatting } from 'src/database/schema/chatting.schema';
import UserSchema from 'src/database/schema/user.schema';
import { UserService } from '../user/user.service';
import { ChattingController } from './chatting.controller';
import { ChattingGateway } from './chatting.gateway';
import { ChattingService } from './chatting.service';
import ConversationSchema, {
  Conversation,
} from 'src/database/schema/conversation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chatting.name, schema: ChattingSchema },
      { name: User.name, schema: UserSchema },
      { name: Conversation.name, schema: ConversationSchema },
    ]),
  ],
  controllers: [ChattingController],
  providers: [
    ChattingService,
    ChattingGateway,
    ChattingRepository,
    AuthenticationBaseService,
    JwtService,
    UserService,
    UserRepository,
    ConversationRepository,
  ],
})
export class ChattingModule {}
