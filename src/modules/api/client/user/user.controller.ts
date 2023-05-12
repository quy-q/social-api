import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Put,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { UpdateUserDto } from './dto';
import { JwtAuthGuard } from 'src/common/guard';
import { FiltersDto } from './dto/filters.dto';
import { User } from '@schema';
import { UserDecorator } from 'src/common/decorator';
import { QueryPaginationI } from 'src/common/interfaces/queryPagination.i';
@ApiTags('User')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@ApiResponse({
  status: 401,
  description: 'Authorization Fail',
})
@Controller({
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   *
   * @param user
   * @param response
   * @param query
   */
  @ApiOperation({ summary: 'Get All User' })
  @ApiOkResponse({ description: 'SUCCESS' })
  @Get()
  async findAll(
    @UserDecorator() user: User,
    @Res() response,
    @Query() query: QueryPaginationI,
  ) {
    const data = await this.userService.userRepository.pagination(
      {},
      query.page,
      query.limit,
    );
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      description: 'SUCCESS',
      data,
    });
  }

  /**
   *
   * @param req
   * @param response
   */
  @ApiOperation({ summary: 'Get Information User' })
  @ApiOkResponse({ description: 'get data success' })
  @Get('/me')
  async findOne(@UserDecorator() user: User, @Res() response) {
    console.log('user-----:', user);
    const data = await this.userService.findOne(user._id);
    response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      description: 'get user success',
      data: data,
    });
  }

  /**
   *
   * @param updateUserDto
   * @param req
   * @param response
   */
  @ApiOperation({ summary: 'Update Information Current User' })
  @ApiOkResponse({ description: 'update data success' })
  @Put('me')
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
    @Res() response,
  ) {
    response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      description: 'update success',
      data: await this.userService.update(req.user._id, updateUserDto),
    });
  }

  // /**
  //  *
  //  * @param id
  //  */
  // @ApiOperation({ summary: 'DeActive Current User' })
  // @ApiOkResponse({ description: 'de active data success' })
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(id);
  // }
}
