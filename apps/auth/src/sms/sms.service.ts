import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Twilio } from 'twilio';
import { AuthService } from '../auth.service';
import { UsersService } from '../users/users.service';
import { CheckVerificationCodeDto } from './dto/verificationcode.dto';

@Injectable()
export default class SmsService {
  private twilioClient: Twilio;

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {
    const accountSid = configService.get('TWILIO_ACCOUNT_SID');
    const authToken = configService.get('TWILIO_AUTH_TOKEN');

    this.twilioClient = new Twilio(accountSid, authToken);
  }
  async initiatePhoneNumberVerification(phoneNumber: string) {
    const serviceId = this.configService.get<string>(
      'TWILIO_VERIFICATION_SERVICE_SID',
    );

    return this.twilioClient.verify.v2
      .services(serviceId)
      .verifications.create({ to: phoneNumber, channel: 'sms', locale: 'en' })
      .then(() => {
        return 'VERIFICATION_CODE_SENT_SUCCESSFULLY';
      });
  }
  async confirmPhoneNumber(
    verificationData: CheckVerificationCodeDto,
    res: Response,
  ) {
    const { phoneNumber, code } = verificationData;
    const serviceSid = this.configService.get<string>(
      'TWILIO_VERIFICATION_SERVICE_SID',
    );

    const result = await this.twilioClient.verify.v2
      .services(serviceSid)
      .verificationChecks.create({ to: phoneNumber, code });
    console.log(result);
    if (!result.valid || result.status !== 'approved') {
      throw new BadRequestException('Wrong code provided');
    }
    let user = await this.userService.findOne({ phoneNumber }, false);

    if (!user) {
      user = await this.userService.create({
        phoneNumber,
        name: 'User',
        memberShip: 'M',
        memberPoint: 0,
        voucher: [],
        email: '',
      });
    }
    // this.authService.login(user, response);
    const tokenPayload = {
      userId: user?._id?.toHexString(),
    };
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() +
        +this.configService.get<string>('JWT_EXPIRATION') * 24,
    );
    const token = this.jwtService.sign(tokenPayload, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });
    res.cookie('Authentication', token, {
      httpOnly: true,
      sameSite: 'strict',
      expires: expires,
    });
    res.status(200).send(user);
  }

  // async sendMessage({ receiverPhoneNumber, message }) {
  //   const senderPhoneNumber = this.configService.get(
  //     "TWILIO_SENDER_PHONE_NUMBER",
  //   );
  //   console.log({ receiverPhoneNumber });

  //   return this.twilioClient.messages.create({
  //     body: message,
  //     from: senderPhoneNumber,
  //     to: receiverPhoneNumber,
  //   });
  // }
}
