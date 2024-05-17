import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from 'src/auth/auth.service';
import { Competence, CompetenceSchema } from 'src/competence/schemas/competence.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },{
        name: Competence.name,
        schema: CompetenceSchema
      }
    ]),
  ],
  providers: [UserService, AuthService],
  controllers: [UserController],  
  exports: [UserService],
})
export class UserModule {}
