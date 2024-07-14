import { AbstractRepository } from '@app/common/database/abstract.repository';
import { Injectable, Logger } from '@nestjs/common';
import { Orders } from './models/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrdersRepository extends AbstractRepository<Orders> {
  protected readonly logger = new Logger(OrdersRepository.name);
  constructor(
    @InjectModel(Orders.name)
    orderModel: Model<Orders>,
  ) {
    super(orderModel);
  }
}
