import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { NotifyEmailDto } from './dto/notify-email.dto';

@Injectable()
export class NotificationsService {
  private readonly transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: this.configService.get('SMTP_USER'),
      clientId: this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
      clientSecret: this.configService.get('GOOGLE_OAUTH_CLIENT_SECRET'),
      refreshToken: this.configService.get('GOOGLE_OAUTH_REFRESH_TOKEN'),
    },
  });

  constructor(private configService: ConfigService) {}

  async notifyEmail({
    email,
    text = 'Orders Successfully Created!',
  }: NotifyEmailDto) {
    if (!email) return;

    await this.transporter.sendMail({
      from: this.configService.get('SMTP_USER'),
      to: email,
      subject: 'CAT CODERS Notification',
      text,
    });
  }
  // async notifyPhone({ phoneNumber }: NotifyPhoneDto) {
  //   // this.smsService.emit("send_message", {
  //   //   receiverPhoneNumber: phoneNumber,
  //   //   message: "Order successfully !",
  //   // });
  //   return await this.sendMessage({
  //     receiverPhoneNumber: phoneNumber,
  //     message: "Order successfully !",
  //   });
  // }
  // async sendMessage({ receiverPhoneNumber, message }) {
  //   const senderPhoneNumber = this.configService.get(
  //     "TWILIO_SENDER_PHONE_NUMBER",
  //   );
  //   console.log({ receiverPhoneNumber });

  //   return this.twilioClient.messages.create({
  //     body: message,
  //     from: senderPhoneNumber,
  //     to: "+84348711727",
  //   });
  // }
}
