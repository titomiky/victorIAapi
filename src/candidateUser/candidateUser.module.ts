import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { candidateUser, candidateUserSchema } from './schemas/candidateUser.schema';
import { candidateUserService } from './candidateUser.service';
import { candidateUserController } from './candidateUser.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: candidateUser.name,
        schema: candidateUserSchema,
      },
    ]),
  ],
  providers: [candidateUserService],
  controllers: [candidateUserController],
})
export class CandidateUserModule {}
