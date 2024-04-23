import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { adminUser } from '../../adminUser/schemas/adminUser.schema';


@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  adminUser: adminUser;
}

export const UserSchema = SchemaFactory.createForClass(User);
