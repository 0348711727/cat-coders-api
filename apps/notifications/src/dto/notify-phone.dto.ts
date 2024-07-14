import { IsPhoneNumber } from 'class-validator';

export class NotifyPhoneDto {
  @IsPhoneNumber()
  phoneNumber: string;
}
