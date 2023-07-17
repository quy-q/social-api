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
import { User } from '@schema';
import { ChattingService } from './chatting.service';

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
  constructor(private readonly chattingService: ChattingService) {}
  /**
   *
   * @param user
   * @param response
   */
  @ApiOperation({ summary: 'Chatting' })
  @Post()
  async getAllMessage(@UserDecorator() user: User, @Res() response) {
    const data = await this.chattingService.getChats();
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      description: 'SUCCESS',
      data,
    });
  }
}
