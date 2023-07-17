import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Delete,
  Res,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from 'src/common/guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDecorator } from 'src/common/decorator';
import { User } from '@schema';

@ApiTags('Order')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@ApiResponse({
  status: 401,
  description: 'Authorization Fail',
})
@Controller({
  version: '1',
})
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /**
   *
   * @param createPostDto
   * @returns
   */
  @Post()
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @UserDecorator() user: User,
    @Res() response,
  ) {
    const data = await this.orderService.create(createOrderDto, user);
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
  @ApiOperation({ summary: 'Get list promotion' })
  @Get()
  async findAll(@UserDecorator() user: User, @Res() response) {
    const data = await this.orderService.findAll(user);
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
    const data = await this.orderService.findOne(id);
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      description: 'SUCCESS',
      data,
    });
  }

  /**
   *
   * @param id
   * @param updateProductDto
   * @param response
   * @returns
   */
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateOrderDto,
    @Res() response,
  ) {
    const data = await this.orderService.update(id, updateProductDto);
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
    const data = await this.orderService.remove(id);
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      description: 'SUCCESS',
      data,
    });
  }
}
