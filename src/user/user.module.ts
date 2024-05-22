import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from '../auth/auth.service';
import { Competence, CompetenceSchema } from '../competence/schemas/competence.schema';
import { SessionService } from '../session/session.service';
import { SessionModule } from '../session/session.module';
import { Injectable } from '@nestjs/common';
import { CompetenceService } from '../competence/competence.service';

@Module({
  imports: [
    SessionModule,
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
  providers: [UserService, AuthService, CompetenceService],
  controllers: [UserController],  
  exports: [UserService],
})
export class UserModule {}
