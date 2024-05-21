import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Session } from '../session/schema/session.schema';
import { SessionDto } from './dtos/session.dto';
import { Model } from 'mongoose';
import { promises } from 'dns';


@Injectable()
export class SessionService {
  constructor( @InjectModel(Session.name) private sessionModel: Model<Session>) {}
  
  async create(createSessionDto: SessionDto): Promise<Session> {
    const createdSession = new this.sessionModel(createSessionDto);
    return createdSession.save();
  }

  async findAll(): Promise<Session[]> {
    return this.sessionModel.find().exec();
  }

  async findOne(id: string): Promise<Session> {
    return this.sessionModel.findById(id).exec();
  }

  async update(id: string, updateSessionDto: Partial<SessionDto>): Promise<Session> {
    return this.sessionModel.findByIdAndUpdate(id, updateSessionDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Session> {
    return this.sessionModel.findByIdAndDelete(id).exec();
  }

  async getSessionLink(candidateId: string, jobOfferId: string): Promise<String> {      
    const sessionBaseUrl = process.env.SESSION_BASE_URL;            
    const existingSession = await this.sessionModel.findOne({ jobOfferId: jobOfferId, candidateId: candidateId });      

    let sessionUrl = '';
    if (existingSession) {      
      sessionUrl = `${sessionBaseUrl}/${existingSession._id}`;
    }   
    return sessionUrl;  
  }
  

  async getOrCreateSession (candidateId: string, jobOfferId: string): Promise<any>  {
    try {      
      // Buscar si existe un documento Session con jobOfferId='fefe' y candidateId='asdf'
      const existingSession = await this.sessionModel.findOne({ jobOfferId: jobOfferId, candidateId: candidateId });          
      // Si existe, devolver su _id
      if (existingSession) {
        return existingSession._id;
      }
      
      console.log('newSession1');
      // Si no existe, guardar el nuevo documento en la base de datos mongo
      const newSession = await this.sessionModel.create({
        jobOfferId: jobOfferId,
        candidateId: candidateId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      console.log('newSession', newSession);
      // Devolver el _id del documento creado
      return newSession._id;
    } catch (error) {     
      console.log(error); 
      return null;
    }

  }
}