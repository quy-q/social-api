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
import { ConversationRepository } from 'src/database/repository';

@WebSocketGateway()
export class ChattingGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;
  constructor(
    private chattingService: ChattingService,
    private conversationRepository: ConversationRepository,
  ) {}

  async handleConnection(client: Socket) {
    await this.chattingService.getUserFromSocket(client);
    console.log(client.id, 'Connected..............................');
  }

  onmoduleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('connected');
    });
  }

  @SubscribeMessage('sendMessage')
  async listenForMessages(
    @MessageBody() message: MessageInterface,
    @ConnectedSocket() socket: Socket,
  ) {
    const user = await this.chattingService.getUserFromSocket(socket);
    console.log('user:', user);
    const conversation = await this.conversationRepository.findConversation(
      user._id,
      message.recipient,
    );
    console.log('conversation:', conversation);
    if (!conversation) {
      console.log(111);
      const conversationCreate = await this.conversationRepository.actionCreate(
        { sender: user._id, recipient: message.recipient },
      );
      const messaging = await this.chattingService.saveChat(
        message,
        user._id,
        conversationCreate._id,
      );
      return this.server.emit('receiveMessage', {
        messaging,
        user,
      });
    }
    const messaging = await this.chattingService.saveChat(
      message,
      user._id,
      conversation._id,
    );
    return this.server.emit('receiveMessage', {
      messaging,
      user,
    });
  }

  @SubscribeMessage('requestAllMessages')
  async requestAllMessages(@ConnectedSocket() socket: Socket) {
    await this.chattingService.getUserFromSocket(socket);
    const messages = await this.chattingService.getChats();
    socket.emit('receive_message', messages);
  }
}
