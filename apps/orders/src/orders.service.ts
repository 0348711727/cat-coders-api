import { PAYMENT_SERVICE, UserDto } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import Stripe from 'stripe';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly configService: ConfigService,
    @Inject(PAYMENT_SERVICE) private readonly paymentService: ClientProxy,
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    phoneNumber,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }: any) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      confirm: true,
      payment_method,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
      currency: 'vnd',
    });
    console.log({ paymentIntent });
    // this.notificationService.emit("notify_phone", { phoneNumber });
    return paymentIntent;
  }
  async create(
    createOrderDto: CreateOrderDto,
    { email, _id: userId }: UserDto,
  ) {
    this.paymentService
      .send('create_charge', {
        ...createOrderDto.charge,
        email,
      })
      .pipe(
        map(res => {
          return this.ordersRepository.create({
            ...createOrderDto,
            timestamp: new Date(),
            userId,
            invoiceId: res.id,
          });
        }),
      )
      .subscribe();
  }

  async findAll() {
    return this.ordersRepository.find({});
  }

  async findOne(_id: string) {
    return this.ordersRepository.findOne({ _id });
  }

  async update(_id: string, updateOrderDto: UpdateOrderDto) {
    return this.ordersRepository.findOneAndUpdate(
      { _id },
      { $set: updateOrderDto },
    );
  }

  async remove(_id: string) {
    return this.ordersRepository.findOneAndDelete({ _id });
  }
}
