import { Module } from '@nestjs/common';
import { JobOffersService } from './job-offers.service';

@Module({
  providers: [JobOffersService]
})
export class JobOffersModule {}
