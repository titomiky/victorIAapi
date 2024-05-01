import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { mongo } from 'mongoose';


@Schema()
export class candidateUser {
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
  
}

export const candidateUserSchema = SchemaFactory.createForClass(candidateUser);
