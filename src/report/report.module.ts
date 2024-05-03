import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { ReportController } from './report.controller';
import { ReportService } from './report.service';
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
  ],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
