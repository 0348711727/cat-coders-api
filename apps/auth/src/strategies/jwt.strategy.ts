import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../interface/token-payload.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UsersService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (request: any) =>
          request?.cookies?.Authentication || request?.Authentication,
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }
  async validate({ userId }: TokenPayload) {
    return this.userService.getUser({ _id: userId });
  }
}
