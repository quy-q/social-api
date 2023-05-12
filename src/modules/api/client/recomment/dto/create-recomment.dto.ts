import { ApiProperty } from '@nestjs/swagger';
import { Comment } from '@schema';
import { Allow, IsString } from 'class-validator';

export class CreateRecommentDto {
  @ApiProperty({
    description: 'text',
    type: String,
  })
  @Allow()
  @IsString()
  text: string;
}
