import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, mongo } from 'mongoose';

@Schema()
export class JobOffer {
  
  @Prop({ required: true})
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ type: mongo.ObjectId, required: false })
  competenceIds?:  [String];
    //ref: Competence,    
  @Prop([{ type: mongo.ObjectId }])
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
  console.log('findOneAndUpdate');  
  this.updatedAt = new Date();
  
  next();
});