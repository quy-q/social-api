import { HttpException, Injectable } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { ProductCategoryRepository } from 'src/database/repository/product-category.repository';

@Injectable()
export class ProductCategoryService {
  constructor(private productCategoryRepository: ProductCategoryRepository) {}

  async create(createProductCategoryDto: CreateProductCategoryDto) {
    const post = await this.productCategoryRepository.actionCreate({
      ...createProductCategoryDto,
    });
    if (!post) {
      throw new HttpException('Post cannot create', 402);
    }
    return post;
  }

  async findAll() {
    return await this.productCategoryRepository.actionGetAll();
  }

  /**
   * get post by id
   * @param id
   * @returns
   */
  async findOne(id: string) {
    return await this.productCategoryRepository.findIdOrFail(id);
  }

  /**
   * update market by id
   * @param id
   * @param user
   * @returns
   */
  async update(id: string, updateProductCategoryDto: UpdateProductCategoryDto) {
    return await this.productCategoryRepository.actionFindByIdAndUpdate(
      id,
      updateProductCategoryDto,
    );
  }

  /**
   * remove post by id
   * @param id
   * @returns
   */
  async remove(id: string) {
    return await this.productCategoryRepository.actionFindByIdAndDelete(id);
  }
}
