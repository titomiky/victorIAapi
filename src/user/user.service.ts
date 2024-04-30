import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId} from 'mongodb';

import { User } from './schemas/user.schema';
import { UserDto } from './dtos/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from './user.module';
import { JobOffer } from './schemas/jobOffer.schema';
import { JobOfferDto } from './dtos/jobOffer.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, private jwtService: JwtService) {}

  async create(user: UserDto) {
    user.password = await bcrypt.hash(user.password, 10);

    const createdUser = new this.userModel(user);
    const savedUser = createdUser.save();
    const token = await this.generateToken(savedUser);    
    return token;    
  }

  private removePassword( user) {
    const { password,...result } = user;
    return result;
  }

  async generateToken (user) {    
    let  onboarding = user.clientUser && typeof user.clientUser === 'object' || user.adminUser && typeof user.adminUser === 'object';
    if (onboarding === undefined) onboarding = true;
    else onboarding = false;
    const payload = {
      email: user.email,
      userId: user._id,
      onBoarding: onboarding,
    };
    const token = await this.jwtService.signAsync(payload);
    return token;    
  }

  async update(id: string, user: UserDto) {
    user.password = await bcrypt.hash(user.password, 10);

    return this.userModel
      .findByIdAndUpdate(id, user, {
        new: true,
      }).select('-password')
      .exec();
  }

  async createAdminUser(id: string, user: UserDto) {
    
    return this.userModel
      .findByIdAndUpdate(id, user, {
        new: true,
      }).select('-password')
      .exec();
  }

  async createClientUser(id: string, user: UserDto) {
    
    return this.userModel
      .findByIdAndUpdate(id, user, {
        new: true,
      }).select('-password')
      .exec();
  }

  async createCandidateUser(id: string, user: UserDto) {
    console.log(user);    
    
    return this.userModel
      .findByIdAndUpdate(id, user, {
        new: true,
      }).select('-password')
      .exec();
  }

  async updateJobOffer (userId: string, jobOfferId: string, jobOffer: JobOfferDto) {
    return this.userModel.updateOne (
      {
        "clientUser._id": new ObjectId(userId),
        "clientUser.jobOffers._id": new ObjectId(jobOfferId)
      },
      {
        $set: {
          "clientUser.jobOffers.$": {
            //"_id": jobOffer,
            "name": jobOffer.name,
            "description": jobOffer.description,
            "candidateIds": jobOffer.candidateIds,            
          }
        }
      }
    );
  }

  async findAll() {
    return this.userModel.find().select('-password').exec();
  }

  async findOne(id: string) {
    return this.userModel.findById(id).select('-password').exec();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({email: email}).exec();
    //return this.userModel.find(user => user.email === email).exec();
  }

  async delete(id: string) {
    return this.userModel.findByIdAndDelete(id).select('-password').exec();
  }

  async deleteJobOffer(userId: string, jobOfferId: string) {
    const filter = { _id: new ObjectId(userId) };
    const update = { $pull: { "clientUser.jobOffers": { _id: new ObjectId(jobOfferId) } } };

    return this.userModel.updateOne(filter, update).exec();    
  }



  async login(email: string, password: string) {
    try {
      const foundUser = await this.userModel.findOne({
        email: email,
      }).select('-password').exec();
      if (!foundUser) {
        return null;
      }

      const isMatch = await bcrypt.compare(password, foundUser.password);
      if (isMatch) {
      
        const token = await this.generateToken(foundUser);
        return token;
      
      } else {
        return null;
      }
    } catch (exception) {
      throw exception;
    }
  }
} 
 