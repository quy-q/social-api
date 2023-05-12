import { ApiProperty, PartialType } from '@nestjs/swagger';

import {
  Allow,
  IsArray,
  IsBoolean,
  IsEmail,
  IsIn,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @ApiProperty({
    description: 'customer email',
    type: String,
  })
  @Allow()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'customer username',
    type: String,
  })
  @Allow()
  @IsOptional()
  @IsString()
  username: string;
}
