import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class adminUser {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true })
  phoneNumber: string;
  
}

export const adminUserSchema = SchemaFactory.createForClass(adminUser);
