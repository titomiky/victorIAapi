import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AdminUser } from './adminUser.schema';
import { ClientUser } from './clientUser.schema';
import { CandidateUser } from './candidateUser.schema';


@Schema()


export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  adminUser: AdminUser;

  @Prop()
  clientUser: ClientUser;

  @Prop()
  candidateUser: CandidateUser;

  @Prop()
  emailValidatedDate: Date;

  @Prop({ type: Date, default: Date.now, required: false })
  createdAt?: Date;

  @Prop({ type: Date, default: Date.now, required: false })
  updatedAt?: Date;

  @Prop()
  CVpdfUrl: string; // Referencia al ID del archivo en GridFS como cadena de texto
    
}

export const UserSchema = SchemaFactory.createForClass(User); 
UserSchema.pre<User>('save', function(next) {

  if (!this.createdAt) {
    this.createdAt = new Date();;
  }
  this.updatedAt = new Date();;
  next();
});

UserSchema.pre<User>('findOneAndUpdate', function (next) {  
  this.updatedAt = new Date();
  
  next();
});


