import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { Chatting, User } from '@schema';
import { ChattingService } from './chatting.service';
import { MessageInterface } from './dto/message.dto';
//80, { cors: true }
@WebSocketGateway()
export class ChattingGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;
  constructor(private chattingService: ChattingService) {}

  async handleConnection(socket: Socket) {
    await this.chattingService.getUserFromSocket(socket);
  }

  @SubscribeMessage('send_message')
  async listenForMessages(
    @MessageBody() message: MessageInterface,
    user: User,
  ) {
    const messaging = await this.chattingService.saveChat(message, user._id);
    this.server.sockets.emit('receive_message', {
      messaging,
      user,
    });
  }

  @SubscribeMessage('request_all_messages')
  async requestAllMessages(@ConnectedSocket() socket: Socket) {
    await this.chattingService.getUserFromSocket(socket);
    const messages = await this.chattingService.getChats();

    socket.emit('send_all_messages', messages);
  }
}
