import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Put,
  Get,
  Delete,
  Param,  
  UploadedFile,
  UseInterceptors,
  Res,
  Req
} from '@nestjs/common';

import { candidateUserService } from './candidateUser.service';
import { candidateUserDto } from './dtos/candidateUser.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CvPdfDto } from './dtos/cvPdf.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('candidateUsers')
@ApiTags('candidateUsers')
export class candidateUserController {
  constructor(private candidateUserService: candidateUserService) {}

  @Post()  
  async create(@UploadedFile() CVpdf: File, @Body(new ValidationPipe()) createcandidateUser: candidateUserDto) {
    return this.candidateUserService.create(createcandidateUser);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updatecandidateUser: candidateUserDto,
  ) {
    return this.candidateUserService.update(id, updatecandidateUser);
  }

  @Get('list')
  async findAll() {
    return this.candidateUserService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.candidateUserService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.candidateUserService.delete(id);
  }

  @ApiConsumes('multipart/form-data', 'application/json')  
  @ApiBody({ type: CvPdfDto, required: true })
  @ApiOkResponse({ status: 201 })
  @UseInterceptors(FileInterceptor('file'))
  @Post('uploadCVpdf')
  async saveCVpdf(
    @UploadedFile() cvFile: Express.Multer.File,
    @Body() userId: string, 
    @Req() req: any, @Res() res: Response
  ) {
    console.log('userId', userId);
    //const cv = await this.cvsService.createCV(cvFile, createCVDto);
    return { message: 'CV creado exitosamente' };
  }
      
}
