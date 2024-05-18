import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ObjectId} from 'mongodb';

import { User } from './schemas/user.schema';
import { UserDto } from './dtos/user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JobOfferDto } from './dtos/jobOffer.dto';
import { JobOffer } from './schemas/jobOffer.schema';
import { Competence } from 'src/competence/schemas/competence.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, @InjectModel(Competence.name) private competenceModel: Model<Competence>, private jwtService: JwtService) {}

  async create(user: UserDto) {
    user.password = await bcrypt.hash(user.password, 10);

    const createdUser = new this.userModel(user);
    return await createdUser.save();        
  }

  private removePassword( user) {
    const { password,...result } = user;
    return result;
  }

  async update(userId: string, user: UserDto) {
    const now = new Date();
    user.password = await bcrypt.hash(user.password, 10);    
    user.updatedAt = now;

    return await this.userModel
    .findOneAndUpdate({ _id: userId }, user, {
      new: true,
    }).select('-password')
      .exec();
  }

  async validateEmail(userId: string) {    
    
    return await this.userModel
      .findOneAndUpdate({ _id: userId }, { emailValidatedDate: Date.now(), updatedAt: Date.now() }, {
        new: false,
      }).select('-password')
      .exec();
  }

  async createAdminUser(userId: string, user: UserDto) {
    
    return await this.userModel
      .findOneAndUpdate({ _id: userId }, user, {
        new: true,
      }).select('-password')
      .exec();      
  }

  async createClientUser(userId: string, user: UserDto) {
    
    return await this.userModel
      .findOneAndUpdate({ _id: userId }, user, {
        new: true,
      }).select('-password')
      .exec();
  }

  async createCandidateUser(userId: string, user: UserDto) {    
    
    return await this.userModel
      .findOneAndUpdate({ _id: userId }, user, {
        new: true,
      }).select('-password')
      .exec();
  }

  async updateJobOffer (userId: string, jobOfferId: string, jobOffer: JobOfferDto) {

    //TODO: pending
    const cliente = await this.userModel.findById(userId);

    // Si no se encuentra el cliente, lanzar un error
    if (!cliente) {      
      throw new Error('Cliente no encontrado');
    }
                
    let jobOfferIndex = -1;
    for (let i = 0; i < cliente.clientUser?.jobOffers?.length; i++) {
      const item = cliente.clientUser?.jobOffers[i];

      if (`${item._id}` === jobOfferId)
        jobOfferIndex = i;
    }
            
   // Si no se encuentra la jobOffer, lanzar un error
   if (jobOfferIndex === -1) {      
      //throw new Error('Oferta de trabajo no encontrada');
    }
      // Actualizar la jobOffer en el array de jobOffers del cliente
      cliente.clientUser.jobOffers[jobOfferIndex].name  = jobOffer.name;
      cliente.clientUser.jobOffers[jobOfferIndex].description  = jobOffer.description;
      cliente.clientUser.jobOffers[jobOfferIndex].competenceIds  = jobOffer.competenceIds;
      cliente.clientUser.jobOffers[jobOfferIndex].candidateIds  = jobOffer.candidateIds;
      const now = new Date();      
      cliente.updatedAt = now;
      cliente.clientUser.updatedAt = now;

      // Guardar los cambios en la base de datos
      return await cliente.save();  
  }

  async getJobOffer (userId: string, jobOfferId: string) {

    //TODO: pending
    const cliente = await this.userModel.findById(userId);

    // Si no se encuentra el cliente, lanzar un error
    if (!cliente) {      
      throw new Error('Cliente no encontrado');
    }
                
    let jobOfferIndex = -1;
    for (let i = 0; i < cliente.clientUser?.jobOffers?.length; i++) {
      const item = cliente.clientUser?.jobOffers[i];    

      if (`${item._id}` === jobOfferId) {
        jobOfferIndex = i;
      }
    }
    return  cliente.clientUser?.jobOffers[jobOfferIndex];
    
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
      candidateUserId: candidate.candidateUser?._id,
      name: candidate.candidateUser.name,
      surname: candidate.candidateUser.surname,
      email: candidate.email      
    }));

    return candidateList;    
  }


  async findAllJobOffers() {

    const users = await this.userModel.find({ 'clientUser': { $exists: true } });

    const jobOffers = [];
    for (const user of users) {
      for (const jobOffer of user.clientUser.jobOffers) {
        jobOffers.push({
          jobOfferId: jobOffer._id,
          name: jobOffer.name,
          description: jobOffer.description,
          numberOfCandidates: jobOffer.candidateIds.length,
        });
      }
    }

    return jobOffers;
  }


  async findAllJobOffersByClientId(clientUserId: string) {    
    const user = await this.userModel.findOne({ 'clientUser._id': clientUserId });

    if (!user) {      
     
      return null;
    }    
    
    const jobOffers = [];
    for (const jobOffer of user.clientUser.jobOffers) {
      jobOffers.push({
        _id: jobOffer._id,
        name: jobOffer.name,
        description: jobOffer.description,
        numCandidates: jobOffer.candidateIds.length,
      });
    }

    return jobOffers;
  }

  async findAllJobOffersByCandidateId(candidateId: string) {
    const users = await this.userModel.find({
      'clientUser.jobOffers.candidateIds': { $in: [candidateId] },
    });

    // Extract and format JobOffers data    
    const jobOffers = [];
    for (const user of users) {
      for (const jobOffer of user.clientUser.jobOffers) {
        if (jobOffer.candidateIds.includes(candidateId)) {
          try {
            console.log(jobOffer.competenceIds.length);
            jobOffer.competenceIds.forEach(id => {
              console.log(id);
            });
            const competenceIds = jobOffer.competenceIds.map(id => new ObjectId(id.toString()));        
            const competences = await this.competenceModel.find({ _id: { $in: competenceIds } }).select('name').exec();
            console.log(competences);

            jobOffers.push({
              _id: jobOffer._id,
              name: jobOffer.name,
              description: jobOffer.description,
              numCandidates: jobOffer.candidateIds.length,
              clientUserName: user.clientUser.name, // Add clientUser name
              competencesNames: competences.map(competence => competence.name)
            });
          } catch(error) {
            console.log(error);
          }
        }
      }
    }

    return jobOffers
  }   

  async findAllCandidatesByJobOfferId(jobOfferId: string) {        
    try {
      const users = await this.userModel.find();  //TODO: improve query, try to find the jobOffer with a mongo query...
      
      let candidateIds = [];
      for (const user of users) {
        if (user.clientUser?.jobOffers) {
          for (let i = 0; i < user.clientUser?.jobOffers?.length; i++) {
            const item = user.clientUser?.jobOffers[i];            

            if (`${item._id}` === jobOfferId) {
              candidateIds = user.clientUser?.jobOffers[i].candidateIds;
              break;
            }    
          }
        }
      }
      
      const candidates = await this.userModel.find({
        'candidateUser._id': { $in: candidateIds },
      });
      // Extract relevant data from candidates
      const candidateList = candidates.map(candidate => ({
        candidateUserId: candidate.candidateUser._id,      
        name: candidate.candidateUser.name,
        surname: candidate.candidateUser.surname,
        email: candidate.email,
        phoneNumber: candidate.candidateUser.phoneNumber
      }));

      return candidateList;    
    } catch(error) {      
      return [];
    }
      
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
  
  async checkCandidateAssignedToJobOffer(candidateId, jobOfferId) {
    try {      
      const query = {
        "clientUser.jobOffers": {
          $elemMatch: {
            '_id': new ObjectId(jobOfferId),            
          }
        }
      };
  
      const projection = { 'clientUser.jobOffers.$': 1 }; // Seleccionar solo la jobOffer que coincide
      const result = await this.userModel.findOne(query);              
        
      if (result && result.clientUser && result.clientUser.jobOffers && result.clientUser.jobOffers.length > 0 && result.clientUser.jobOffers[0].candidateIds.includes(candidateId)) {        
        console.log("El candidato y la oferta de trabajo sí existen en el documento.");
        return true;                
      } else {
        console.log("El candidato y la oferta de trabajo no existen en el documento.");
        return false;
      }                 
  
    } catch (error){
      return false;
    }
  }
 
} 
 