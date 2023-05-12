import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DatingService } from './dating.service';
import { CreateDatingDto } from './dto/create-dating.dto';
import { UpdateDatingDto } from './dto/update-dating.dto';

@Controller('dating')
export class DatingController {
  constructor(private readonly datingService: DatingService) {}

  @Post()
  create(@Body() createDatingDto: CreateDatingDto) {
    return this.datingService.create(createDatingDto);
  }

  @Get()
  findAll() {
    return this.datingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.datingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDatingDto: UpdateDatingDto) {
    return this.datingService.update(+id, updateDatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datingService.remove(+id);
  }
}
