import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotifyEmailDto } from './dto/notify-email.dto';
import { NotificationsService } from './notifications.service';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  //not implement yet
  // @UsePipes(new ValidationPipe())
  // @EventPattern("notify_phone")
  // async notifyPhone(@Payload() data: NotifyPhoneDto) {
  //   return this.notificationsService.notifyPhone(data);
  // }

  // @UsePipes(new ValidationPipe())
  @EventPattern('notify_email')
  async notifyEmail(@Payload() data: NotifyEmailDto) {
    return this.notificationsService.notifyEmail(data);
  }

  // @Get()
  // getHello() {
  //   return "Hello";
  // }
}
