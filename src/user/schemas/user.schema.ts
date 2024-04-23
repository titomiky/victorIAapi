import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { adminUser } from '../../adminUser/schemas/adminUser.schema';
import { clientUser } from '../../clientUser/schemas/clientUser.schema';
import { candidateUser } from '../../candidateUser/schemas/candidateUser.schema';


@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  adminUser: adminUser;

  @Prop()
  clientUser: clientUser;

  @Prop()
  candidateUser: candidateUser;
}

export const UserSchema = SchemaFactory.createForClass(User);
