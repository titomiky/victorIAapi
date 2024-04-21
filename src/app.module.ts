import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CandidatesModule } from './candidates/candidates.module';
import { JobOffersModule } from './job-offers/job-offers.module';
import { ClientsModule } from './clients/clients.module';
import { AdministratorsModule } from './administrators/administrators.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://root:vDHH4ZtZQUag6Fre@localhost:27017/holaqueai?authMechanism=DEFAULT&authSource=admin'), CandidatesModule, JobOffersModule, ClientsModule, AdministratorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
