import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CurrentUser, JwtAuthGuard } from '@app/common';
import { UserDto } from '@app/common/dto/user.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser() user: UserDto,
  ) {
    console.log({ user });
    return this.ordersService.create(createOrderDto, user);
  }

  // @Get()
  // @UseGuards(JwtAuthGuard)
  // async findAll() {
  //   return this.ordersService.findAll();
  // }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Get()
  healthCheck() {
    return { status: 'OK' };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
