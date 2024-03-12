import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsNumber, IsObject, IsString } from 'class-validator';

export class CreatePaymentIntentDto {
  @ApiProperty({
    description: 'customerId',
    type: String,
  })
  @Allow()
  @IsString()
  customerId: string;

  @ApiProperty({
    description: 'currency',
    type: String,
  })
  @Allow()
  @IsString()
  currency: string;

  @ApiProperty({
    description: 'paymentMethodType',
    type: String,
  })
  @Allow()
  @IsString()
  paymentMethodType: string;

  @ApiProperty({
    description: 'paymentMethodOptions',
    type: String,
  })
  @Allow()
  @IsObject()
  paymentMethodOptions: any;
}
