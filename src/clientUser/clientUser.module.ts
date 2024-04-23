import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { clientUser, clientUserSchema } from './schemas/clientUser.schema';
import { clientUserService } from './clientUser.service';
import { clientUserController } from './clientUser.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: clientUser.name,
        schema: clientUserSchema,
      },
    ]),
  ],
  providers: [clientUserService],
  controllers: [clientUserController],
})
export class ClientUserModule {}
