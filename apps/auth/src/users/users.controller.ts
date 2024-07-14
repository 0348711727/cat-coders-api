import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Users, CurrentUser } from '@app/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(protected readonly userService: UsersService) {}
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @Post("reset")
  // async resetCollection() {
  //   return this.userService.resetCollection();
  // }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: Users) {
    return user;
  }
}
