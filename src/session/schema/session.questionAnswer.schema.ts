import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class QuestionAnswer {
  @Prop({ required: true, unique: true })
  question: string;

  @Prop({ required: true })
  answer: string;
 
}

export const QuestionAnswerSchema = SchemaFactory.createForClass(QuestionAnswer);