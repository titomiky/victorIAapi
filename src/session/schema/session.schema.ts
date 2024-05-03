import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { CompetenceResult } from './session.competenceResult.schema';
import { QuestionAnswer } from './session.questionAnswer.schema';

@Schema()
export class Session {
  @Prop({ required: true, unique: true })
  jobOfferId: string;

  @Prop({ required: true })
  candidateUserId: string;

  @Prop()
  createdDate: Date;
  @Prop()
  startedDate: Date;
  @Prop()
  finishedDate: Date;

  @Prop([{ type: QuestionAnswer }])
  interview?: [QuestionAnswer];

  @Prop([{ type: CompetenceResult }])
  result?: [CompetenceResult];
 
}

export const SessionSchema = SchemaFactory.createForClass(Session);