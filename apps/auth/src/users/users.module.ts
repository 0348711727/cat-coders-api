import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule, LoggerModule } from '@app/common';
import { UserSchema, Users } from '@app/common';
import { UserRepository } from './user.repository';
import { TwilioModule } from 'nestjs-twilio';
import { ConfigModule, ConfigService } from '@nestjs/config';
import SmsController from '../sms/sms.controller';
import SmsService from '../sms/sms.service';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    DatabaseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
    TwilioModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        accountSid: configService.get('TWILIO_ACCOUNT_SID'),
        authToken: configService.get('TWILIO_AUTH_TOKEN'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UsersController, SmsController],
  providers: [
    UsersService,
    UserRepository,
    SmsService,
    AuthService,
    JwtService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
