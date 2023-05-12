import { ApiProperty } from '@nestjs/swagger';
import { User } from '@schema';
import { Allow, IsString } from 'class-validator';

export class CreateFollowingDto {
  @ApiProperty({
    description: 'user following',
    type: String,
  })
  @Allow()
  @IsString()
  userId: string;
}
