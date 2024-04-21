import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { administrator, administratorSchema } from './schemas/administrators.schema';
//import { AdministratorsService } from './administrators/administrators.service';
//import { AdministratorsService } from './administrators.service';

@Module({
imports: [MongooseModule.forFeature([{
    name: administrator.name, 
    schema: administratorSchema }])],
providers: [],

})
export class AdministratorsModule {}
