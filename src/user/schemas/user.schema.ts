import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { adminUser } from './adminUser.schema';
import { clientUser } from './clientUser.schema';
import { candidateUser } from './candidateUser.schema';


@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  adminUser: adminUser;

  @Prop()
  clientUser: clientUser;

  @Prop()
  candidateUser: candidateUser;

  @Prop()
  emailValidatedDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
