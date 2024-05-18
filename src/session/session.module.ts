import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { Session, SessionSchema } from '../session/schema/session.schema';


@Module({
    imports: [
        MongooseModule.forFeature([
          {
            name: Session.name,
            schema: SessionSchema,
          },
        ]), 
      ],
      providers: [SessionService],
      controllers: [SessionController],  
      exports: [SessionService],    
})
export class SessionModule {}

