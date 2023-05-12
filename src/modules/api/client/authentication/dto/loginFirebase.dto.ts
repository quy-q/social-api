import { Allow, IsJWT, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginFirebaseDto {
  @ApiProperty()
  @Allow()
  @IsJWT()
  @IsNotEmpty()
  firebase_token: string;
}
