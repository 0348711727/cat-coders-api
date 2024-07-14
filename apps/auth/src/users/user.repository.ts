import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from '@app/common';

@Injectable()
export class UserRepository extends AbstractRepository<Users> {
  protected readonly logger = new Logger(UserRepository.name);
  constructor(
    @InjectModel(Users.name)
    userModel: Model<Users>,
  ) {
    super(userModel);
  }
}
