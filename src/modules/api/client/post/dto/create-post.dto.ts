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
import { User } from '@schema';

export class CreatePostDto {
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

  @Allow()
  @IsString()
  userId: User;
}
