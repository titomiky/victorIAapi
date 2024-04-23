import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { adminUser, adminUserSchema } from './schemas/adminUser.schema';
import { adminUserService } from './adminUser.service';
import { adminUserController } from './adminUser.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: adminUser.name,
        schema: adminUserSchema,
      },
    ]),
  ],
  providers: [adminUserService],
  controllers: [adminUserController],
})
export class AdminUserModule {}
