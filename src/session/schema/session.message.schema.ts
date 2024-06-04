import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class SessionMessage {
  @Prop({ required: true, unique: true })
  role: string;

  @Prop({ required: true })
  content: string; 

}

export const SessionMessageSchema = SchemaFactory.createForClass(SessionMessage);