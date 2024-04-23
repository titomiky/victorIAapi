import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { clientUser } from './schemas/clientUser.schema';
import { clientUserDto } from './dtos/clientUser.dto';

@Injectable()
export class clientUserService {
  constructor(@InjectModel(clientUser.name) private clientUserModel: Model<clientUser>) {}

  async create(clientUser: clientUserDto) {
    const createdclientUser = new this.clientUserModel(clientUser);
    return createdclientUser.save();
  }

  async update(id: string, clientUser: clientUserDto) {
    return this.clientUserModel
      .findByIdAndUpdate(id, clientUser, {
        new: true,
      })
      .exec();
  }

  async findAll() {
    return this.clientUserModel.find().exec();
  }

  async findOne(id: string) {
    return this.clientUserModel.findById(id).exec();
  }

  async delete(id: string) {
    return this.clientUserModel.findByIdAndDelete(id).exec();
  }
}
