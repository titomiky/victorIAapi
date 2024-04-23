import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AdminUserModule } from './adminUser/adminUser.module';
import { ClientUserModule } from './clientUser/clientUser.module';
import { CandidateUserModule } from './candidateUser/candidateUser.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
     'mongodb://localhost:27017/holaqueai',
    ),
    UserModule, AdminUserModule, ClientUserModule, CandidateUserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
