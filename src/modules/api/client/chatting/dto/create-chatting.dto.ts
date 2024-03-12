import { ApiProperty } from '@nestjs/swagger';
import { Conversation, User } from '@schema';
import { Allow, IsOptional, IsString } from 'class-validator';

export class CreateChattingDto {
  @ApiProperty({
    description: 'message',
    type: String,
  })
  @Allow()
  @IsString()
  message: string;

  @ApiProperty({
    description: 'type',
    type: String,
  })
  @Allow()
  @IsOptional()
  @IsString()
  type: User;

  @ApiProperty({
    description: 'conversationId',
    type: String,
  })
  @Allow()
  @IsOptional()
  @IsString()
  conversationId: Conversation;

  @ApiProperty({
    description: 'recipient',
    type: String,
  })
  @Allow()
  @IsOptional()
  @IsString()
  sender: User;

  @ApiProperty({
    description: 'recipient',
    type: String,
  })
  @Allow()
  @IsOptional()
  @IsString()
  recipient: User;
}
