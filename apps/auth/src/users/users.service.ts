import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.findOne(
      { phoneNumber: createUserDto.phoneNumber },
      false,
    );
    if (user) {
      throw new ConflictException('User already exist');
    }
    return this.userRepository.create({
      ...createUserDto,
    });
  }
  findAll() {
    return this.userRepository.find({});
  }

  findOne({ _id = '', phoneNumber = '' }, throwError: boolean = true) {
    if (_id) {
      console.log('here');
      return this.userRepository.findOne({ _id }, throwError);
    }
    console.log('there', throwError);
    return this.userRepository.findOne({ phoneNumber }, throwError);
  }
  findById(_id: string) {
    return this.userRepository.findById({ _id });
  }

  update(_id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.findOneAndUpdate(
      { _id },
      { $set: updateUserDto },
    );
  }

  remove(_id: string) {
    return this.userRepository.findOneAndDelete({ _id });
  }

  updateMany() {
    return this.userRepository.updateMany();
  }
  resetCollection() {
    return this.userRepository.resetCollection();
  }
  async getUser(getUserDto: GetUserDto) {
    return this.userRepository.findOne(getUserDto);
  }
}
