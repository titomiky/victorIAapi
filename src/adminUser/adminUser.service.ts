import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { adminUser } from './schemas/adminUser.schema';
import { adminUserDto } from './dtos/adminUser.dto';

@Injectable()
export class adminUserService {
  constructor(@InjectModel(adminUser.name) private adminUserModel: Model<adminUser>) {}

  async create(adminUser: adminUserDto) {
    const createdadminUser = new this.adminUserModel(adminUser);
    return createdadminUser.save();
  }

  async update(id: string, adminUser: adminUserDto) {
    return this.adminUserModel
      .findByIdAndUpdate(id, adminUser, {
        new: true,
      })
      .exec();
  }

  async findAll() {
    return this.adminUserModel.find().exec();
  }

  async findOne(id: string) {
    return this.adminUserModel.findById(id).exec();
  }

  async delete(id: string) {
    return this.adminUserModel.findByIdAndDelete(id).exec();
  }
}
