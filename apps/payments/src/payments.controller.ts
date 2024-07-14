import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';
import { PaymentsService } from './payments.service';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UsePipes(new ValidationPipe())
  @MessagePattern('create_charge')
  async createCharge(@Payload() data: PaymentsCreateChargeDto) {
    return await this.paymentsService.createCharge(data);
  }
}
