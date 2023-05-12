import { ApiProperty } from '@nestjs/swagger';
import { User } from '@schema';
import { Allow, IsString } from 'class-validator';

export class MessageInterface {
  @ApiProperty({
    description: 'message',
    type: String,
  })
  @Allow()
  @IsString()
  message: string;

  @ApiProperty({
    description: 'userId',
    type: String,
  })
  @Allow()
  @IsString()
  recipent: string;
}
