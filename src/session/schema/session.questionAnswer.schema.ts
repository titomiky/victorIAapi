import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class QuestionAnswer {
  @Prop({ required: true, unique: true })
  role: string;

  @Prop({ required: true })
  content: string;
 
  @Prop({ default:  Date.now})
  createdAt: Date;
}

export const QuestionAnswerSchema = SchemaFactory.createForClass(QuestionAnswer);

QuestionAnswerSchema.pre<QuestionAnswer>('save', function(next) {

  if (!this.createdAt) {
    this.createdAt = new Date();
  }  
  next();
});
