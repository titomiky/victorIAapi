import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { mongo } from 'mongoose';


@Schema()
export class CandidateUser {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: false })
  currentSalary: number;

  @Prop({ required: false })
  desiredSalary: number;

  @Prop({ required: false })
  birthDate: Date;
  
  @Prop({ required: false })
  cvText: string;

  @Prop({ required: false })
  cvPdf: Buffer;
  
  @Prop()
  createdByUserId?: string; 

  @Prop({ type: Date, default: Date.now, required: false })
  createdAt?: Date;

  @Prop({ type: Date, default: Date.now, required: false })
  updatedAt?: Date;
  
}

export const CandidateUserSchema = SchemaFactory.createForClass(CandidateUser);

CandidateUserSchema.pre<CandidateUser>('save', function(next) {

  if (!this.createdAt) {
    this.createdAt = new Date();;
  }
  this.updatedAt = new Date();;
  next();
});

CandidateUserSchema.pre<CandidateUser>('findOneAndUpdate', function (next) {
  console.log('findOneAndUpdate');  
  this.updatedAt = new Date();
  
  next();
});