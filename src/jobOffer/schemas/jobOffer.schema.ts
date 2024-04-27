import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Competence } from '../../competence/schemas/competence.schema';
import mongoose from 'mongoose';

@Schema()
export class JobOffer {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  competencies: {
    type: mongoose.Schema.Types.ObjectId[],
    ref: Competence,
    required: true
  }

}

export const JobOfferSchema = SchemaFactory.createForClass(JobOffer);