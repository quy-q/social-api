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
  Query,
  HttpStatus,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/common/guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDecorator } from 'src/common/decorator';
import { User } from '@schema';
import { FiltersDto } from './dto/filters.dto';
@ApiTags('Post')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@ApiResponse({
  status: 401,
  description: 'Authorization Fail',
})
@Controller({
  version: '1',
})
export class PostController {
  constructor(private readonly postService: PostService) {}

  /**
   *
   * @param createPostDto
   * @returns
   */
  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @UserDecorator() user: User,
    @Res() response,
  ) {
    const data = this.postService.create(createPostDto, user);
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      description: 'SUCCESS',
      data,
    });
  }

  /**
   *
   * @param user
   * @param response
   */
  //@UserDecorator() user: User
  @ApiOperation({ summary: 'Get list post' })
  @Get()
  async findAll(@Query() filters: FiltersDto, @Res() response) {
    console.log('222222222');
    const data = await this.postService.findAll(filters);
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      description: 'SUCCESS',
      data,
    });
  }

  /**
   *
   * @param id
   * @param response
   * @returns
   */
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response) {
    const data = await this.postService.findOne(id);
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      description: 'SUCCESS',
      data,
    });
  }

  /**
   *
   * @param id
   * @param updatePostDto
   * @param response
   * @returns
   */
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Res() response,
  ) {
    const data = await this.postService.update(id, updatePostDto);
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      description: 'SUCCESS',
      data,
    });
  }

  /**
   *
   * @param id
   * @param response
   * @returns
   */
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response) {
    const data = await this.postService.remove(id);
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      description: 'SUCCESS',
      data,
    });
  }
  /**
   *
   * @param response
   * @returns
   */
  @ApiOperation({ summary: 'Get list post following' })
  @Get('following/user')
  async postByFollowing(
    @UserDecorator() user: User,
    @Query() filter: FiltersDto,
    @Res() response,
  ) {
    console.log('filter:', filter);
    console.log('user:', user);
    const data = await this.postService.postByFollowing(filter, user._id);
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      description: 'SUCCESS',
      data,
    });
  }
}
