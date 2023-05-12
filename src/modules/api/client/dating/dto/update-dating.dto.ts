import { PartialType } from '@nestjs/swagger';
import { CreateDatingDto } from './create-dating.dto';

export class UpdateDatingDto extends PartialType(CreateDatingDto) {}
