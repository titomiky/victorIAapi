import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;  

@Schema()
export class JobOffer {
  
  @Prop({ required: true})
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ type: ObjectId, required: false })
  competenceIds?:  [String];
    //ref: Competence,    
  @Prop([{ type: ObjectId }])
  candidateIds?: [String];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  _id: any;
  
}

export const JobOfferSchema = SchemaFactory.createForClass(JobOffer);

JobOfferSchema.pre<JobOffer>('save', function(next) {

  if (!this.createdAt) {
    this.createdAt = new Date();;
  }
  this.updatedAt = new Date();;
  next();
});

JobOfferSchema.pre<JobOffer>('findOneAndUpdate', function (next) {  
  this.updatedAt = new Date();
  
  next();
});