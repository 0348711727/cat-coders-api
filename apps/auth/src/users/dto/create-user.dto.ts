import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  memberShip: 'M' | 'S' | 'G' | 'D' = 'M';

  @IsNumber()
  memberPoint: number = 0;

  @IsString()
  email: string;

  voucher: string[] = [];
}
