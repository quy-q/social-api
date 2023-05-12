import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { JwtAuthGuard } from 'src/common/guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDecorator } from 'src/common/decorator';
import { User } from '@schema';
@ApiTags('Like')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@ApiResponse({
  status: 401,
  description: 'Authorization Fail',
})
@Controller({
  version: '1',
})
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  /**
   *  like and unlike
   * @param user
   * @param id
   * @returns
   */
  @Post(':idPost')
  async like(
    @UserDecorator() user: User,
    @Param('idPost') idPost: string,
    @Res() response,
  ) {
    const data = await this.likeService.like(idPost, user);
    return await response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      description: 'Success',
      data,
    });
  }

  /**
   *  like and unlike
   * @param user
   * @param id
   * @returns
   */
  @Get('check-liked/:idPost')
  async checkLiked(
    @UserDecorator() user: User,
    @Param('idPost') idPost: string,
    @Res() response,
  ) {
    const data = await this.likeService.checkLiked(idPost, user);
    return await response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      description: 'Success',
      data,
    });
  }
}
