import { CreateChargeDto } from '@app/common/dto/create-charge.dto';
import { IsPhoneNumber, IsString } from 'class-validator';

export class PaymentsCreateChargeDto extends CreateChargeDto {
  @IsString()
  email: string;

  @IsPhoneNumber()
  phoneNumber: string;
}
