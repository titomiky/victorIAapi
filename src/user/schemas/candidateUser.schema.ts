import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';


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
  CVtext: string;

  @Prop({ required: false })
  CVpdf: string;
    
}

export const candidateUserSchema = SchemaFactory.createForClass(candidateUser);
