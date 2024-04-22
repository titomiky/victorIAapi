import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './schemas/user.schema';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private todoModel: Model<User>) {}

  async create(todo: UserDto) {
    const createdTodo = new this.todoModel(todo);
    return createdTodo.save();
  }

  async update(id: string, todo: UserDto) {
    return this.todoModel
      .findByIdAndUpdate(id, todo, {
        new: true,
      })
      .exec();
  }

  async findAll() {
    return this.todoModel.find().exec();
  }

  async findOne(id: string) {
    return this.todoModel.findById(id).exec();
  }

  async delete(id: string) {
    return this.todoModel.findByIdAndDelete(id).exec();
  }
}
