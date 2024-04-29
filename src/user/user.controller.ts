import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Put,
  Get,
  Delete,
  Param,
  HttpException,
  HttpStatus,
  Req,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UserDto } from './dtos/user.dto';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiOperation, ApiConsumes, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { UserResponseDto } from './dtos/user.response.dto';
import { loginUserDto } from './dtos/user.login.dto';
import { AuthGuard } from '../auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
import { Public } from '../auth/auth.controller';
import { UserPasswordDto } from './dtos/user.password.dto';
import { adminUserDto } from './dtos/adminUser.dto';
import { clientUserDto } from './dtos/clientUser.dto';
import { candidateUserDto } from './dtos/candidateUser.dto';
import { CvPdfDto } from './dtos/CvPdf.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JobOffer } from './schemas/jobOffer.schema';
import { JobOfferDto } from './dtos/jobOffer.dto';

@Controller('Users')
@ApiTags('Users')
export class UserController {
  constructor(private userService: UserService, private authService: AuthService) {}

  @Post()  
  @Public()
  @ApiOperation({ summary: 'Create a user', description: 'Create a user with email and password' })
  @ApiResponse({ status: 201, description: 'Created user ok', type: UserResponseDto })
  async create(
    @Body(new ValidationPipe()) createuser: UserDto,
    @Req() request: Request,
  ) {
    try {  
      return this.userService.create(createuser);
    } catch (error) {      
      throw new HttpException(error, HttpStatus.CONFLICT); 
    }
  }

  @Post('createAdmin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create/update admin user', description: 'Create/update an admin user' })
  @ApiResponse({ status: 200, description: 'Created admin user ok', type: UserResponseDto })
  async createAdmin(    
    @Body(new ValidationPipe()) adminUser: adminUserDto, @Req() request: Request
  ) {
    const userId = await this.authService.getUserIdFromToken(request);    
    const user = await this.userService.findOne(userId);    
    
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    user.adminUser = adminUser;

    console.log(userId);    
    return this.userService.createAdminUser(userId, user);
  }

  @Put('createClient')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create/update client user', description: 'Create/update a client user' })
  @ApiResponse({ status: 200, description: 'Created client user ok', type: UserResponseDto })
  async createClient(    
    @Body(new ValidationPipe()) clientUser: clientUserDto, @Req() request: Request
  ) {
    const userId = await this.authService.getUserIdFromToken(request);    
    const user = await this.userService.findOne(userId);    
    
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    user.clientUser = clientUser;

    console.log(userId);    
    return this.userService.createClientUser(userId, user);
  }


  @Put('createCandidate')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create/update candidate user', description: 'Create/update a candidate user' })
  @ApiResponse({ status: 200, description: 'Created candidate user ok', type: UserResponseDto })
  async createCandidate(    
    @Body(new ValidationPipe()) candidateUser: candidateUserDto, @Req() request: Request
  ) {
    const userId = await this.authService.getUserIdFromToken(request);    
    const user = await this.userService.findOne(userId);    
    
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    user.candidateUser = candidateUser;

    console.log(userId);    
    return this.userService.createCandidateUser(userId, user);
  }


  @Put('createJobOffer')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create/update job offer', description: 'Create/update a job offer. Send the complete array of competencies to update/delete competencies to the job offer' })
  @ApiResponse({ status: 200, description: 'Created jobOffer user ok', type: UserResponseDto })
  async createJobOffer(    
    @Body(new ValidationPipe()) newJobOffer: JobOfferDto, @Req() request: Request
  ) {
    const userId = await this.authService.getUserIdFromToken(request);    
    const user = await this.userService.findOne(userId);    
    
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const jobOffer = new JobOffer();
    jobOffer.name = newJobOffer.name;
    jobOffer.description = newJobOffer.description;
    jobOffer.competenceIds = newJobOffer.competenceIds;
    
    user.clientUser.jobOffers?.push(jobOffer);
  
    return this.userService.createCandidateUser(userId, user);
  }

  @Put('changePassword')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'CHange the password of the user', description: 'Change the password of the logged user' })
  @ApiResponse({ status: 200, description: 'Changed password ok', type: UserResponseDto })
  async update(    
    @Body(new ValidationPipe()) updateuser: UserPasswordDto, @Req() request: Request
  ) {
    const userId = await this.authService.getUserIdFromToken(request);
    const email = await this.authService.getEmailFromToken(request);
    const updatedUser : UserDto = {
      password: updateuser.password,
      email: email
    };
    console.log(userId);    
    return this.userService.update(userId, updatedUser);
  }

  @Get('list')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List users', description: 'List all users' })
  @ApiResponse({ status: 200, description: 'Returned users ok', type: UserResponseDto })
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Returned user ok', type: UserResponseDto })
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Deleted user ok', type: UserResponseDto })
  async delete(@Param('id') id: string) {
    console.log(id);
    return this.userService.delete(id);
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

