import { HttpException, Injectable } from '@nestjs/common';
import { Chatting, User } from '@schema';
import { parse } from 'cookie';
import { Socket } from 'socket.io';
import { ChattingRepository } from 'src/database/repository';
import { WsException } from '@nestjs/websockets';
import { AuthenticationBaseService } from 'src/common/base';
import { MessageInterface } from './dto/message.dto';

@Injectable()
export class ChattingService {
  constructor(
    private chattingRepository: ChattingRepository,
    private authenticationService: AuthenticationBaseService,
  ) {}

  async getUserFromSocket(socket: Socket) {
    console.log('socket:', socket);
    const cookie = socket.handshake.headers.cookie;
    const { Authentication: authenticationToken } = parse(cookie);
    const user =
      await this.authenticationService.getUserFromAuthenticationToken(
        authenticationToken,
      );
    if (!user) {
      throw new WsException('Invalid credentials.');
    }
    return user;
  }

  async getChats(): Promise<Chatting[]> {
    return await this.chattingRepository.actionGetAll();
  }

  async saveChat(message: MessageInterface, sender: any) {
    const chat = {
      ...message,
      sender: sender,
    };
    return await this.chattingRepository.actionCreate(chat);
  }
}
