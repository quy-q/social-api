import { Module } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryController } from './product-category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import ProductCategorySchema, {
  ProductCategory,
} from 'src/database/schema/product-category.schema';
import { ProductCategoryRepository } from 'src/database/repository/product-category.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductCategory.name, schema: ProductCategorySchema },
    ]),
  ],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService, ProductCategoryRepository],
})
export class ProductCategoryModule {}
