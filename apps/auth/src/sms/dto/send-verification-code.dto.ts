import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class SendVerficationCodeDto {
  // @IsString()
  // @IsNotEmpty()
  // name: string;

  // @IsString()
  // @IsNotEmpty()
  // @MinLength(7)
  // password: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\+[1-9]\d{1,14}$/, {
    message: 'Phone number must be in the format +XXXXXXXXXXXXX',
  })
  phoneNumber: string;
}

export default SendVerficationCodeDto;
