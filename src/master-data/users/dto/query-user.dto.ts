import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { OrderType, PaginatorLimit, PaginatorLimitArray } from 'src/lib/enums';
import { toNumber } from 'src/lib/helpers/cast.helper';
import { InArray } from 'src/lib/validators';
import { OrderBy } from '../enums/order-by.enum';

export class QueryUserDto {
  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsNumber()
  @IsOptional()
  page?: number;

  @InArray(PaginatorLimitArray)
  @IsOptional()
  perPage?: PaginatorLimit;

  @IsEnum(OrderBy)
  @IsOptional()
  orderBy?: OrderBy;

  @IsEnum(OrderType)
  @IsOptional()
  orderType?: OrderType;

  @IsOptional()
  search?: string;

  get getOrderBy() {
    if (this.orderBy) {
      return {
        [this.orderBy]: this.orderType ?? OrderType.DESC,
      };
    }

    return {
      [OrderBy.UPDATEDAT]: OrderType.DESC,
    };
  }
}
