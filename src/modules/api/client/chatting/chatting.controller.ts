import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/common/guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDecorator } from 'src/common/decorator';
import { Chatting, User } from '@schema';
import { ChattingService } from './chatting.service';
import { ChattingGateway } from './chatting.gateway';
import { MessageInterface } from './dto/message.dto';
import { Socket } from 'socket.io';
import { ConnectedSocket } from '@nestjs/websockets';

@ApiTags('Chatting')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@ApiResponse({
  status: 401,
  description: 'Authorization Fail',
})
@Controller({
  version: '1',
})
export class ChattingController {
  constructor(
    private readonly chattingService: ChattingService,
    private chattingGateway: ChattingGateway,
  ) {}
  /**
   *
   * @param user
   * @param response
   */
  @ApiOperation({ summary: 'Chatting' })
  @Post()
  async findAll(
    @UserDecorator() user: User,
    @Res() response,
    @Body() message: MessageInterface,
  ) {
    const data = await this.chattingGateway.listenForMessages(message, user);
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      description: 'SUCCESS',
      data,
    });
  }
}
