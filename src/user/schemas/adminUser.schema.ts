import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class AdminUser {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  surname: string;

  @Prop({ required: false })
  phoneNumber: string;

  @Prop({ type: Date, required: false, default: new Date() })
  createdAt?: Date;

  @Prop({ type: Date, required: false })
  updatedAt?: Date;

}

export const AdminUserSchema = SchemaFactory.createForClass(AdminUser);

AdminUserSchema.pre<AdminUser>('save', function(next) {
  console.log('nuevo')
  const now = new Date();    
  if (!this.createdAt) {
    console.log('nuevo')
    this.createdAt = now;
  }
  this.updatedAt = now;
  next();
});

AdminUserSchema.pre<AdminUser>('findOneAndUpdate', function (next) {
  console.log('findOneAndUpdate');  
  const now = new Date();
  this.updatedAt = now;
  next();
});