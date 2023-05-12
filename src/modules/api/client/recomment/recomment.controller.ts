import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@schema';
import { UserDecorator } from 'src/common/decorator';
import { JwtAuthGuard } from 'src/common/guard';
import { RecommentService } from './recomment.service';
import { CreateRecommentDto } from './dto/create-recomment.dto';
import { UpdateRecommentDto } from './dto/update-recomment.dto';

@ApiTags('Re Comment')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@ApiResponse({
  status: 401,
  description: 'Authorization Fail',
})
@Controller({
  version: '1',
})
export class RecommentController {
  constructor(private readonly recommentService: RecommentService) {}

  @Post(':idCmt')
  async create(
    @UserDecorator() user: User,
    @Param('idCmt') idCmt: string,
    @Body() createCommentDto: CreateRecommentDto,
    @Res() response,
  ) {
    const data = await this.recommentService.create(
      createCommentDto,
      user,
      idCmt,
    );
    return await response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      description: 'SUCCESS',
      data,
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateRecommentDto,
    @Res() response,
  ) {
    const data = await this.recommentService.update(id, updateCommentDto);
    return await response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      description: 'SUCCESS',
      data,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response) {
    const data = await this.recommentService.remove(id);
    return await response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      description: 'SUCCESS',
      data,
    });
  }
}
