import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Competence } from '../../competence/schemas/competence.schema';
import mongoose from 'mongoose';
import { mongo } from 'mongoose';

@Schema()
export class JobOffer {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ type: mongo.ObjectId, required: true })
  competenceIds:  [mongo.ObjectId];
    //ref: Competence,    
  @Prop([{ type: mongo.ObjectId }])
  candidateIds?: [mongo.ObjectId];
}

export const JobOfferSchema = SchemaFactory.createForClass(JobOffer);