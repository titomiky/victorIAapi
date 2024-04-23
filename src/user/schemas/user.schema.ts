import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { adminUser } from '../../adminUser/schemas/adminUser.schema';
import { clientUser } from '../../clientUser/schemas/clientUser.schema';


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
}

export const UserSchema = SchemaFactory.createForClass(User);
