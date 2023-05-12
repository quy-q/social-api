import { Injectable } from '@nestjs/common';
import { CreateDatingDto } from './dto/create-dating.dto';
import { UpdateDatingDto } from './dto/update-dating.dto';

@Injectable()
export class DatingService {
  create(createDatingDto: CreateDatingDto) {
    return 'This action adds a new dating';
  }

  findAll() {
    return `This action returns all dating`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dating`;
  }

  update(id: number, updateDatingDto: UpdateDatingDto) {
    return `This action updates a #${id} dating`;
  }

  remove(id: number) {
    return `This action removes a #${id} dating`;
  }
}
