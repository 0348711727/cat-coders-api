import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { SendVerficationCodeDto } from './dto/send-verification-code.dto';
import { CheckVerificationCodeDto } from './dto/verificationcode.dto';
import SmsService from './sms.service';
// import JwtAuthenticationGuard from "../authentication/jwt-authentication.guard";
// import RequestWithUser from "../authentication/requestWithUser.interface";

@Controller('sms')
@UseInterceptors(ClassSerializerInterceptor)
export default class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('init-verification')
  // @UseGuards(JwtAuthenticationGuard)
  async initiatePhoneNumberVerification(
    @Body() sendVerificationData: SendVerficationCodeDto,
  ) {
    return await this.smsService.initiatePhoneNumberVerification(
      sendVerificationData.phoneNumber,
    );
  }

  @Post('code-verification')
  async checkVerificationCode(
    @Body() verificationData: CheckVerificationCodeDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.smsService.confirmPhoneNumber(verificationData, res);
  }

  // @MessagePattern("send_message")
  // @UsePipes(new ValidationPipe())
  // async sendPhoneMessage(@Payload() data: any) {
  //   return await this.smsService.sendMessage(data);
  // }
}
