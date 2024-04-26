import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class adminUser {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  surname: string;

  @Prop({ required: false })
  phoneNumber: string;

}

export const adminUserSchema = SchemaFactory.createForClass(adminUser);
