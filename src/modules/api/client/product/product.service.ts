import { HttpException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { User } from '@schema';
import { ProductRepository } from 'src/database/repository';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async create(createProductDto: CreateProductDto, user: User) {
    const post = await this.productRepository.actionCreate({
      ...createProductDto,
      user: user._id,
    });
    if (!post) {
      throw new HttpException('Post cannot create', 402);
    }
    return post;
  }

  /**
   * get all post by user
   * @param user
   * @returns
   */
  async findAll(user: User) {
    return await this.productRepository.findIdOrFail(user._id);
  }

  /**
   * get post by id
   * @param id
   * @returns
   */
  async findOne(id: string) {
    return await this.productRepository.findIdOrFail(id);
  }

  /**
   * update market by id
   * @param id
   * @param user
   * @returns
   */
  async update(id: string, updateMarketDto: UpdateProductDto) {
    return await this.productRepository.actionFindByIdAndUpdate(
      id,
      updateMarketDto,
    );
  }

  /**
   * remove post by id
   * @param id
   * @returns
   */
  async remove(id: string) {
    await this.productRepository.model.deleteMany({ post: id });
    return await this.productRepository.actionFindByIdAndDelete(id);
  }
}
