import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'product ID',
    type: String,
  })
  @Allow()
  @IsString()
  productId: string;

  @ApiProperty({
    description: 'user name',
    type: String,
  })
  @Allow()
  @IsString()
  userName: string;

  @ApiProperty({
    description: 'phone',
    type: String,
  })
  @Allow()
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    description: 'address',
    type: String,
  })
  @Allow()
  @IsString()
  address: string;

  @ApiProperty({
    description: 'district',
    type: String,
  })
  @Allow()
  @IsString()
  district: string;

  @ApiProperty({
    description: 'province',
    type: String,
  })
  @Allow()
  @IsString()
  province: string;

  @ApiProperty({
    description: 'quantity',
    type: Number,
  })
  @Allow()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: 'type',
    example: 'ORDER OR PAID',
    type: String,
  })
  @Allow()
  @IsNumber()
  type: 'ORDER';
}
