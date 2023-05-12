import { SORT } from 'src/common/constrains/filter-order.const';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class OrderDto {
  @IsOptional()
  @Expose()
  @IsEnum(SORT)
  @ApiPropertyOptional({ enum: SORT, name: 'orderBy[createdAt]' })
  createdAt?: string;
}
