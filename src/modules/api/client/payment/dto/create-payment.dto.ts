import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'order ID',
    type: String,
  })
  @Allow()
  @IsString()
  orderId: string;

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
}
