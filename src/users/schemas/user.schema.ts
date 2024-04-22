import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop()
  password: string;

}

export const TodoSchema = SchemaFactory.createForClass(User);
