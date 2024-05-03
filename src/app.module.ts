import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CompetenceModule } from './competence/competence.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { CopyViewsService } from './copy-views.service';
import { SessionModule } from './session/session.module';
import { ReportModule } from './report/report.module';

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
    UserModule, CompetenceModule, AuthModule, SessionModule, ReportModule
  ],
  controllers: [AppController],
  providers: [AppService, CopyViewsService],
})
export class AppModule {}
