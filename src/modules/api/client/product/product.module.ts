import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import ProductSchema, { Product } from 'src/database/schema/product.schema';
import { ProductRepository } from 'src/database/repository';
import { ProductService } from './product.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
