import { HttpException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User } from '@schema';
import { OrdersRepository, ProductRepository } from 'src/database/repository';
import { InjectConnection } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Injectable()
export class OrderService {
  constructor(
    private orderRepository: OrdersRepository,
    private productRepository: ProductRepository,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async create(createOrderDto: CreateOrderDto, user: User) {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const product = await this.productRepository.findIdOrFail(
        createOrderDto.productId,
      );
      console.log('createOrderDto:', createOrderDto);
      console.log('product:', product);
      if (createOrderDto.quantity > product.quantity) {
        throw new HttpException('Too number of products', 403);
      }
      await this.productRepository.actionFindByIdAndUpdate(
        createOrderDto.productId,
        {
          quantity: product.quantity - createOrderDto.quantity,
        },
        session,
      );
      const order = await this.orderRepository.actionCreate({
        ...createOrderDto,
        price: product.price * createOrderDto.quantity,
        user: user._id,
      });
      if (!order) {
        throw new HttpException('Order cannot create', 402);
      }
      await session.commitTransaction();
      return order;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  /**
   * get all post by user
   * @param user
   * @returns
   */
  async findAll(user: User) {
    return await this.orderRepository.findIdOrFail(user._id);
  }

  /**
   * get post by id
   * @param id
   * @returns
   */
  async findOne(id: string) {
    return await this.orderRepository.findIdOrFail(id);
  }

  /**
   * update market by id
   * @param id
   * @param user
   * @returns
   */
  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return await this.orderRepository.actionFindByIdAndUpdate(
      id,
      updateOrderDto,
    );
  }

  /**
   * remove post by id
   * @param id
   * @returns
   */
  async remove(id: string) {
    await this.orderRepository.model.deleteMany({ post: id });
    return await this.orderRepository.actionFindByIdAndDelete(id);
  }
}
