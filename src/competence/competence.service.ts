import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Competence } from './schemas/competence.schema';
import { CompetenceDto } from './dtos/competence.dto';
import { ObjectId } from 'mongodb';

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

  async checkIfCompetenceIdsExist(ids: string[]) {
    try {      
      const objectIds = ids.map(id => new ObjectId(id));    
      // Buscar documentos que tengan _id en el array de objectIds
      console.log(objectIds);
      const competences = await this.competenceModel.find({ _id: { $in: objectIds } }).exec();    
      console.log('competencesLenght', competences)  
      // Verificar si el número de documentos encontrados coincide con el número de IDs proporcionados
      return competences.length === ids.length;
    } catch(error) {
      console.log(error)
      return false;
    }
  }
}
