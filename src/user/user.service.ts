import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './schemas/user.schema';
import { UserDto } from './dtos/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, private jwtService: JwtService) {}

  async create(user: UserDto) {
    user.password = await bcrypt.hash(user.password, 10);

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

  async login(email: string, password: string) {
    try {
      const foundUser = await this.userModel.findOne({
        email: email,
      }).exec();
      if (!foundUser) {
        return null;
      }


      const isMatch = await bcrypt.compare(password, foundUser.password);
      if (isMatch) {

        const payload = {
          email: foundUser.email,
          sub: foundUser._id,
        };
        const token = await this.jwtService.signAsync(payload);
        return token;
      
      } else {
        return null;
      }
    } catch (exception) {
      throw exception;
    }
  }
} 
 