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
    description: 'recipient',
    type: String,
  })
  @Allow()
  @IsString()
  recipient: string;

  @ApiProperty({
    description: 'sender',
    type: String,
  })
  @Allow()
  @IsString()
  sender: string;
}
