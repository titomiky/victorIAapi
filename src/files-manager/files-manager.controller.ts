// src/s3/s3.controller.ts
import { Controller, Post, UploadedFile, UseInterceptors, Get, Param, Res, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesManagerService } from './files-manager.service';
import { Response } from 'express';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiOperation, ApiConsumes, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { CandidateCvPdfDto } from '../user/dtos/candidateCvPdf.dto';
import { Public } from '../auth/auth.controller';

@ApiTags('files')
@Controller('files')
export class FilesManagerController {
  constructor(private readonly s3Service: FilesManagerService) {}


  
//   @ApiConsumes('multipart/form-data', 'application/json')  
//   @ApiBody({ type: CvPdfDto, required: true })
//   @ApiOkResponse({ status: 201 })
//   @Public()
//   @UseInterceptors(FileInterceptor('file'))
//   @Post('upload')    
//   async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() candidateCvPdf: CandidateCvPDf
// ) {
//     const fileUrl = await this.s3Service.uploadFile(file);
//     return { url: fileUrl };
//   }

//   @Get('download/:fileKey')
//   async downloadFile(@Param('fileKey') fileKey: string, @Res() res: Response) {
//     try {
//         const file = await this.s3Service.downloadFile(fileKey);

//         // Si el cuerpo del archivo es un string, conviértelo a un Buffer
//         const body = typeof file.Body === 'string' ? Buffer.from(file.Body, 'utf-8') : file.Body;

//         res.set({
//         'Content-Type': file.ContentType,
//         'Content-Length': file.ContentLength,
//         'Content-Disposition': `attachment; filename="${fileKey}"`,
//         });

//         res.send(body);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send(error);
//     }
//   }
}
