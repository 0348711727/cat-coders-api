import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class CheckVerificationCodeDto {
  // @IsString()
  // @IsNotEmpty()
  // readonly verificationSid: string;

  @IsString()
  @IsNotEmpty()
  readonly code: string;

  @IsNotEmpty()
  @Matches(/^\+[1-9]\d{1,14}$/, {
    message: 'Phone number must be in the format +XXXXXXXXXXXXX',
  })
  phoneNumber: string;
}
