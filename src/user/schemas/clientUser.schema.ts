import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { JobOffer } from './jobOffer.schema';


@Schema()
export class ClientUser {
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

  @Prop([{ type: JobOffer }])
  jobOffers?: [JobOffer];

  @Prop({ type: Date, default: Date.now, required: false})
  createdAt?: Date;

  @Prop({ type: Date, default: Date.now, required: false})
  updatedAt?: Date;
}

export const ClientUserSchema = SchemaFactory.createForClass(ClientUser);

ClientUserSchema.pre<ClientUser>('save', function(next) {

  if (!this.createdAt) {
    this.createdAt = new Date();;
  }
  this.updatedAt = new Date();;
  next();
});

ClientUserSchema.pre<ClientUser>('findOneAndUpdate', function (next) {
  
  this.updatedAt = new Date();
  
  next();
});