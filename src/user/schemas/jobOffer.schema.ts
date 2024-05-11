import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, mongo } from 'mongoose';

@Schema()
export class JobOffer {
  
  @Prop({ type: mongo.ObjectId })
  _id: ObjectId;

  @Prop({ required: true})
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ type: mongo.ObjectId, required: false })
  competenceIds?:  [String];
    //ref: Competence,    
  @Prop([{ type: mongo.ObjectId }])
  candidateIds?: [String];

}

export const JobOfferSchema = SchemaFactory.createForClass(JobOffer);