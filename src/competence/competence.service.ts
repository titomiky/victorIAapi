import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Competence } from './schemas/competence.schema';
import { CompetenceDto } from './dtos/competence.dto';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;  
import { Logger } from '@nestjs/common';

@Injectable()
export class CompetenceService {
  constructor(@InjectModel(Competence.name) private competenceModel: Model<Competence>) {}

  private readonly logger = new Logger(Competence.name);

  async create(competence: CompetenceDto) {
    const createdCompetence = new this.competenceModel(competence);
    return createdCompetence.save();
  }

  async update(id: string, competence: CompetenceDto) {
    return this.competenceModel
      .findByIdAndUpdate(id, competence, {
        new: true,
      })
      .exec();
  }

  async findAll() {
    return this.competenceModel.find().exec();
  }

  async findOne(id: string) {
    return this.competenceModel.findById(id).exec();
  }

  async delete(id: string) {
    return this.competenceModel.findByIdAndDelete(id).exec();
  }

  async checkIfCompetenceIdsExist(ids: string[]) {
    try {            
      const objectIds = ids.map(id => new ObjectId(id));                
      const countCompetences = await this.competenceModel.countDocuments({ _id: { $in: objectIds } });                
      return countCompetences === ids.length;
    } catch(error) {
      console.log('errorcito...', error)
      return false;
    }
  }
}
