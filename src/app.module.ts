import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AdminUserModule } from './adminUser/adminUser.module';
import { ClientUserModule } from './clientUser/clientUser.module';
import { CandidateUserModule } from './candidateUser/candidateUser.module';
import { CompetenceModule } from './competence/competence.module';
import { JobOfferModule } from './jobOffer/jobOffer.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    ConfigModule.forRoot(),    
    MongooseModule.forRoot(
      process.env.MONGODB_URL,
    ),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UserModule, AdminUserModule, ClientUserModule, CandidateUserModule, CompetenceModule,JobOfferModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
