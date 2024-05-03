import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class CompetenceResult {
  @Prop({ required: true, unique: true })
  competenceId: string;

  @Prop({ required: true })
  result: number;
 
}

export const CompetenceResultSchema = SchemaFactory.createForClass(CompetenceResult);
