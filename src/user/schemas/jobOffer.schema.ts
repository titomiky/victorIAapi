import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { mongo } from 'mongoose';

@Schema()
export class JobOffer {
  @Prop({ required: true})
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ type: mongo.ObjectId, required: true })
  competenceIds:  [String];
    //ref: Competence,    
  @Prop([{ type: mongo.ObjectId }])
  candidateIds?: [String];
}

export const JobOfferSchema = SchemaFactory.createForClass(JobOffer);