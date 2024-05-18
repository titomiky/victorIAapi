import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { CompetenceResult } from './session.competenceResult.schema';
import { QuestionAnswer } from './session.questionAnswer.schema';

@Schema()
export class Session {
  @Prop({ required: true, unique: true })
  jobOfferId: string;

  @Prop({ required: true })
  candidateId: string;

  @Prop()
  createdAt: Date;
  
  @Prop()
  updatedAt: Date;
  
  @Prop()
  startedAt: Date;

  @Prop()
  finishedAt: Date;
  
  @Prop([{ type: QuestionAnswer }])
  interview?: [QuestionAnswer];

  @Prop([{ type: CompetenceResult }])
  result?: [CompetenceResult];
 
}

export const SessionSchema = SchemaFactory.createForClass(Session);


SessionSchema.pre<Session>('save', function(next) {

  if (!this.createdAt) {
    this.createdAt = new Date();;
  }
  this.updatedAt = new Date();;
  next();
});

SessionSchema.pre<Session>('findOneAndUpdate', function (next) {  
  this.updatedAt = new Date();
  
  next();
});
