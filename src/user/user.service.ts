import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './schemas/user.schema';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: UserDto) {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async update(id: string, user: UserDto) {
    return this.userModel
      .findByIdAndUpdate(id, user, {
        new: true,
      })
      .exec();
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  async delete(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
