import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Competence, CompetenceSchema } from './schemas/competence.schema';
import { CompetenceService } from './competence.service';
import { CompetenceController } from './competence.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Competence.name,
        schema: CompetenceSchema,
      },
    ]),
  ],
  providers: [CompetenceService],
  controllers: [CompetenceController],
})
export class CompetenceModule {}
