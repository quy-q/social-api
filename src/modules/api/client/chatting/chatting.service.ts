import { HttpException, Injectable } from '@nestjs/common';
import { Chatting, User } from '@schema';
import { parse } from 'cookie';
import { Socket } from 'socket.io';
import {
  ChattingRepository,
  ConversationRepository,
} from 'src/database/repository';
import { WsException } from '@nestjs/websockets';
import { AuthenticationBaseService } from 'src/common/base';
import { MessageInterface } from './dto/message.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class ChattingService {
  constructor(
    private chattingRepository: ChattingRepository,
    private authenticationService: AuthenticationBaseService,
    private converSationRepository: ConversationRepository,
  ) {}

  async getUserFromSocket(socket: Socket) {
    let auth_token = socket.handshake.headers.authentication;

    auth_token = auth_token.toString().split(' ')[1];

    const user =
      await this.authenticationService.getUserFromAuthenticationToken(
        auth_token,
      );

    if (!user) {
      throw new WsException('Invalid credentials.');
    }
    return user;
  }

  async getChats(): Promise<Chatting[]> {
    return await this.chattingRepository.actionGetAll();
  }

  async saveChat(message: any, sender: string, conversation: string) {
    const chat = {
      ...JSON.parse(message),
      sender: sender,
      conversation: conversation,
    };
    const lastMessage =
      await this.converSationRepository.actionFindByIdAndUpdate(conversation, {
        lastMessage: JSON.parse(message).message,
        lastActivity: new Date(),
      });
    if (!lastMessage) {
      throw new ExceptionsHandler();
    }
    return await this.chattingRepository.actionCreate(chat);
  }
}
