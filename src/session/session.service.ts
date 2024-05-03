import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Session } from '../session/schema/session.schema';
import { SessionDto } from './dtos/session.dto';
import { Model } from 'mongoose';


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
}