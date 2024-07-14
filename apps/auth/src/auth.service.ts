import { Injectable } from '@nestjs/common';
import { Users } from '@app/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async login(user: Users, response: Response) {
    const tokenPayload = {
      userId: user?._id?.toHexString(),
    };
    const expires = new Date();
    expires.getSeconds() + this.configService.get<string>('JWT_EXPIRATION');
    const token = this.jwtService.sign(tokenPayload, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });
    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }
}
