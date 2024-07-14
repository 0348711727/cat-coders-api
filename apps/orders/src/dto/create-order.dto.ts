import { Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';
import { CreateChargeDto } from '@app/common';

export class CreateOrderDto {
  @IsDate()
  @Type(() => Date)
  timestamp: Date;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;

  // @IsString()
  // @IsNotEmpty()
  // placeId: string;

  // @IsString()
  // @IsNotEmpty()
  // invoiceId: string;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateChargeDto)
  charge: CreateChargeDto;
}
