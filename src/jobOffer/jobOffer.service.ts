import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { JobOffer } from './schemas/jobOffer.schema';
import { JobOfferDto } from './dtos/jobOffer.dto';

@Injectable()
export class JobOfferService {
  constructor(@InjectModel(JobOffer.name) private jobOfferModel: Model<JobOffer>) {}

  async create(jobOffer: JobOfferDto) {
    const createdJobOffer = new this.jobOfferModel(jobOffer);
    return createdJobOffer.save();
  }

  async update(id: string, jobOffer: JobOfferDto) {
    return this.jobOfferModel
      .findByIdAndUpdate(id, jobOffer, {
        new: true,
      })
      .exec();
  }

  async findAll() {
    return this.jobOfferModel.find().exec();
  }

  async findOne(id: string) {
    return this.jobOfferModel.findById(id).exec();
  }

  async delete(id: string) {
    return this.jobOfferModel.findByIdAndDelete(id).exec();
  }
}
