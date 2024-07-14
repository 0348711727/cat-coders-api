import {
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CardDto } from './card.dto';
import { Type } from 'class-transformer';

export class CreateChargeDto {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CardDto)
  card: CardDto;

  @IsNumber()
  amount: number;

  @IsString()
  payment_method: string = 'pm_card_visa';
}
