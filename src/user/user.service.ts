import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId} from 'mongodb';

import { User } from './schemas/user.schema';
import { UserDto } from './dtos/user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JobOfferDto } from './dtos/jobOffer.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, private jwtService: JwtService) {}

  async create(user: UserDto) {
    user.password = await bcrypt.hash(user.password, 10);

    const createdUser = new this.userModel(user);
    return await createdUser.save();        
  }

  private removePassword( user) {
    const { password,...result } = user;
    return result;
  }



  async update(id: string, user: UserDto) {
    user.password = await bcrypt.hash(user.password, 10);

    return await this.userModel
      .findByIdAndUpdate(id, user, {
        new: true,
      }).select('-password')
      .exec();
  }

  async validateEmail(id: string) {    
    
    return await this.userModel
      .findByIdAndUpdate(id, { emailValidatedDate: Date.now() }, {
        new: false,
      }).select('-password')
      .exec();
  }

  async createAdminUser(id: string, user: UserDto) {
    
    return await this.userModel
      .findByIdAndUpdate(id, user, {
        new: true,
      }).select('-password')
      .exec();
  }

  async createClientUser(id: string, user: UserDto) {
    
    return await this.userModel
      .findByIdAndUpdate(id, user, {
        new: true,
      }).select('-password')
      .exec();
  }

  async createCandidateUser(id: string, user: UserDto) {    
    
    return await this.userModel
      .findByIdAndUpdate(id, user, {
        new: true,
      }).select('-password')
      .exec();
  }

  async updateJobOffer (userId: string, jobOfferId: string, jobOffer: JobOfferDto) {
    return await this.userModel.updateOne (
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
    return await this.userModel.find().select('-password').exec();
  }

  async findAllCandidates() {

    const projection = { "candidateUser._id": 1, "candidateUser.name": 1, "candidateUser.surname": 1, "email": 1 };

    // Find candidates with a candidateUser field
    const candidates = await this.userModel.find({ candidateUser: { $exists: true } }, projection);

    // Extract relevant data from candidates
    const candidateList = candidates.map(candidate => ({
      candidateUserId: candidate._id,
      name: candidate.candidateUser.name,
      surname: candidate.candidateUser.surname,
      email: candidate.email      
    }));


    return candidateList;
    //return await this.userModel.find().select('-password').exec();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id).select('-password').exec();
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({email: email}).exec();
    //return this.userModel.find(user => user.email === email).exec();
  }

  async delete(id: string) {
    return await this.userModel.findByIdAndDelete(id).select('-password').exec();
  }

  async deleteJobOffer(userId: string, jobOfferId: string) {
    const filter = { _id: new ObjectId(userId) };
    const update = { $pull: { "clientUser.jobOffers": { _id: new ObjectId(jobOfferId) } } };

    return await this.userModel.updateOne(filter, update).exec();    
  }
  

 
} 
 