import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { JobOffer, JobOfferSchema } from './schemas/jobOffer.schema';
import { JobOfferService } from './jobOffer.service';
import { JobOfferController } from './jobOffer.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: JobOffer.name,
        schema: JobOfferSchema,
      },
    ]),
  ],
  providers: [JobOfferService],
  controllers: [JobOfferController],
})
export class JobOfferModule {}
