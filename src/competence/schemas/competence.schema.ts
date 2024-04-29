import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class Competence {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: false })
  description: string;

}

export const CompetenceSchema = SchemaFactory.createForClass(Competence);
