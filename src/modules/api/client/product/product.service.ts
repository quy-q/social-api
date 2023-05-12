import { HttpException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { User } from '@schema';
import { ProductRepository } from 'src/database/repository/product.repository';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}
  async create(createProductDto: CreateProductDto, user: User) {
    const post = this.productRepository.actionCreate({
      ...createProductDto,
      user: user._id,
    });
    if (!post) {
      throw new HttpException('Product cannot create', 402);
    }
    return post;
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
