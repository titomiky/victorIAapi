import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class clientUser {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: false })
  position: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  companyName: string;

  @Prop({ required: false })
  companyAddress: string;

  @Prop({ required: true })
  numberOfEmployees: number;
  
  @Prop({ required: false })
  companyNIF?: string;
}

export const clientUserSchema = SchemaFactory.createForClass(clientUser);
