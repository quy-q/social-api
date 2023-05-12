import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { FollowingService } from './following.service';
import { CreateFollowingDto } from './dto/create-following.dto';
import { UpdateFollowingDto } from './dto/update-following.dto';
import { JwtAuthGuard } from 'src/common/guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { response } from 'express';
import { UserDecorator } from 'src/common/decorator';
import { User } from '@schema';

@ApiTags('Following')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@ApiResponse({
  status: 401,
  description: 'Authorization Fail',
})
@Controller({
  version: '1',
})
@Controller('following')
export class FollowingController {
  constructor(private readonly followingService: FollowingService) {}

  @Post()
  async create(
    @UserDecorator() user: User,
    @Body() createFollowingDto: CreateFollowingDto,
    @Res() response,
  ) {
    const data = await this.followingService.create(
      user,
      createFollowingDto.userId,
    );
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      description: 'SUCCESS',
      data,
    });
  }

  @Get()
  findAll() {
    return this.followingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.followingService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFollowingDto: UpdateFollowingDto,
  ) {
    return this.followingService.update(+id, updateFollowingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.followingService.remove(+id);
  }
}
