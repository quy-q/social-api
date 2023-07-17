import { ApiProperty } from '@nestjs/swagger';
import { User } from '@schema';
import { Allow, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'title',
    type: String,
  })
  @Allow()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'description',
    type: String,
  })
  @Allow()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'product name',
    type: String,
  })
  @Allow()
  @IsString()
  productName: string;

  @ApiProperty({
    description: 'product category ID',
    type: String,
  })
  @Allow()
  @IsString()
  productCategory: string;

  @ApiProperty({
    description: 'price',
    type: Number,
  })
  @Allow()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'quantity',
    type: Number,
  })
  @Allow()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: 'Image Product',
    type: [String],
  })
  @Allow()
  @IsString()
  image: [string];

  @ApiProperty({
    description: 'province',
    type: String,
  })
  @Allow()
  @IsString()
  province: string;
}
