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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/common/guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDecorator } from 'src/common/decorator';
import { User } from '@schema';

@ApiTags('Product')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@ApiResponse({
  status: 401,
  description: 'Authorization Fail',
})
@Controller({
  version: '1',
})
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   *
   * @param createPostDto
   * @returns
   */
  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @UserDecorator() user: User,
    @Res() response,
  ) {
    const data = await this.productService.create(createProductDto, user);
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
    const data = await this.productService.findAll(user);
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
    const data = await this.productService.findOne(id);
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
    @Body() updateProductDto: UpdateProductDto,
    @Res() response,
  ) {
    const data = await this.productService.update(id, updateProductDto);
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
    const data = await this.productService.remove(id);
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      description: 'SUCCESS',
      data,
    });
  }
}
