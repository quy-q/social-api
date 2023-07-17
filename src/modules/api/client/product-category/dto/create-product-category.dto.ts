import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsString } from 'class-validator';

export class CreateProductCategoryDto {
  @ApiProperty({
    description: 'title',
    type: String,
  })
  @Allow()
  @IsString()
  title: string;
}
