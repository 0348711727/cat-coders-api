import { NOTIFICATIONS_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import Stripe from 'stripe';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationService: ClientProxy,
  ) {}
  private readonly stripe = new Stripe(
    this.configService.get<string>('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2024-04-10',
    },
  );
  async createCharge({
    amount,
    payment_method = 'pm_card_visa',
    email,
  }: PaymentsCreateChargeDto) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      confirm: true,
      payment_method,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
      currency: 'vnd',
      // customer: phoneNumber,
    });
    this.notificationService.emit('notify_email', {
      email,
      text: `Your payment of ${amount} vnd has completed successfully`,
    });
    return paymentIntent;
  }
}
