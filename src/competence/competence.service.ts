import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Competence } from './schemas/competence.schema';
import { CompetenceDto } from './dtos/competence.dto';

@Injectable()
export class CompetenceService {
  constructor(@InjectModel(Competence.name) private competenceModel: Model<Competence>) {}

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
}
