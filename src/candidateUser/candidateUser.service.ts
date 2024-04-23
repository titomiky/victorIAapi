import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { candidateUser } from './schemas/candidateUser.schema';
import { candidateUserDto } from './dtos/candidateUser.dto';

@Injectable()
export class candidateUserService {
  constructor(@InjectModel(candidateUser.name) private candidateUserModel: Model<candidateUser>) {}

  async create(candidateUser: candidateUserDto) {
    const createdcandidateUser = new this.candidateUserModel(candidateUser);
    return createdcandidateUser.save();
  }

  async update(id: string, candidateUser: candidateUserDto) {
    return this.candidateUserModel
      .findByIdAndUpdate(id, candidateUser, {
        new: true,
      })
      .exec();
  }

  async findAll() {
    return this.candidateUserModel.find().exec();
  }

  async findOne(id: string) {
    return this.candidateUserModel.findById(id).exec();
  }

  async delete(id: string) {
    return this.candidateUserModel.findByIdAndDelete(id).exec();
  }
}
