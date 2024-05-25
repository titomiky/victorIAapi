  // src/s3/s3.module.ts
import { Module } from '@nestjs/common';
import { FilesManagerService } from './../files-manager/files-manager.service';
import { FilesManagerController } from './files-manager.controller';

@Module({
  providers: [FilesManagerService],
  controllers: [FilesManagerController],
})
export class FilesManagerModule {}
