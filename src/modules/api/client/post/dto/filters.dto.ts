import { QueryPaginationI } from 'src/common/interfaces/queryPagination.i';
import { OrderDto } from './order.dto';
import { Expose, Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, ValidateNested } from 'class-validator';

export class FiltersDto extends QueryPaginationI {
  @ValidateNested()
  @IsOptional()
  @ApiPropertyOptional({ type: () => OrderDto })
  @Type(() => OrderDto)
  @Expose()
  orderBy?: OrderDto;
}
