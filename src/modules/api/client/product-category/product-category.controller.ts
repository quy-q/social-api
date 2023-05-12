import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guard';

@ApiTags('Product Category')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@ApiResponse({
  status: 401,
  description: 'Authorization Fail',
})
@Controller({
  version: '1',
})
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Post()
  create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoryService.create(createProductCategoryDto);
  }

  @Get()
  findAll() {
    return this.productCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductCategoryDto: UpdateProductCategoryDto,
  ) {
    return this.productCategoryService.update(+id, updateProductCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productCategoryService.remove(+id);
  }
}
