import { ApiProperty } from '@nestjs/swagger';
import { Post, User } from '@schema';
import { Allow, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'text',
    type: String,
  })
  @Allow()
  @IsString()
  text: string;

  @Allow()
  @IsOptional()
  @IsString()
  postId: Post;

  @Allow()
  @IsOptional()
  @IsString()
  userId: User;
}
