import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Response } from 'express';
import { CurrentUser } from '../../../libs/common/src/decorators/current-user-decorator';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Users } from '@app/common';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello() {
    return 'Hello from auth controller';
  }
  // @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: Users,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
    response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async authenticate(@Payload() data: any) {
    return data.user;
  }
}
