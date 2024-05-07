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
import * as ejs from 'ejs'; 
import * as nodemailer from 'nodemailer';

@Controller('users')
@ApiTags('users')
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
      const savedUser = await this.userService.create(createuser);      
      return this.authService.generateToken(savedUser);
      
    } catch (error) {      
      throw new HttpException(error, HttpStatus.CONFLICT); 
    }
  }

  @Put('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create/update admin user', description: 'Create/update an admin user' })
  @ApiResponse({ status: 200, description: 'Created admin user ok', type: UserResponseDto })
  async createAdmin(    
    @Body(new ValidationPipe()) adminUser: adminUserDto, @Req() request: Request
  ) {
    try {
      const userId = await this.authService.getUserIdFromToken(request);    
      const user = await this.userService.findOne(userId);    
      
      if (!user) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }

      user.adminUser = adminUser;     
      const savedAdminUser = await this.userService.createAdminUser(userId, user);
      return this.authService.generateToken(savedAdminUser);
    } catch (error) {      
      throw new HttpException('Error de servicio', HttpStatus.INTERNAL_SERVER_ERROR); 
    }
  }

  @Put('client')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create/update client user', description: 'Create/update a client user' })
  @ApiResponse({ status: 200, description: 'Created client user ok', type: UserResponseDto })
  async createClient(    
    @Body(new ValidationPipe()) clientUser: clientUserDto, @Req() request: Request
  ) {
    try {
      const userId = await this.authService.getUserIdFromToken(request);    
      const user = await this.userService.findOne(userId);    
      
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      user.clientUser = clientUser;
        
      const savedClientUser = await this.userService.createClientUser(userId, user);
      return this.authService.generateToken(savedClientUser);
    
    } catch (error) {      
      throw new HttpException('Error de servicio', HttpStatus.INTERNAL_SERVER_ERROR); 
    }
  }


  @Put('candidate')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create/update candidate user', description: 'Create/update a candidate user' })
  @ApiResponse({ status: 200, description: 'Created candidate user ok', type: UserResponseDto })
  async createCandidate(    
    @Body(new ValidationPipe()) candidateUser: candidateUserDto, @Req() request: Request
  ) {
    try {
      const userId = await this.authService.getUserIdFromToken(request);    
      const user = await this.userService.findOne(userId);    
      
      if (!user) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }
      
      user.candidateUser = candidateUser;    
      user.candidateUser.createdByUserId = userId;

      const savedCandidateUser = await this.userService.createCandidateUser(userId, user);
      return this.authService.generateToken(savedCandidateUser);
    } catch (error) {      
      throw new HttpException('Error de servicio', HttpStatus.INTERNAL_SERVER_ERROR); 
    }
  }


  @Post('jobOffer')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create/update job offer', description: 'Create/update a job offer. Send the complete array of competencies to update/delete competencies to the job offer' })
  @ApiResponse({ status: 200, description: 'Created jobOffer user ok', type: UserResponseDto })
  async createJobOffer(    
    @Body(new ValidationPipe()) newJobOffer: JobOfferDto, @Req() request: Request
  ) {
    try {
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
    } catch (error) {      
      throw new HttpException('Error de servicio', HttpStatus.INTERNAL_SERVER_ERROR); 
    }
  }

  @Put('jobOffer/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update job offer', description: 'Update a job offer. Send the complete array of competencies to update/delete competencies to the job offer' })
  @ApiResponse({ status: 200, description: 'Updated jobOffer user ok', type: UserResponseDto })
  async updateJobOffer(    
    @Body(new ValidationPipe()) newJobOffer: JobOfferDto, @Req() request: Request, @Param('id') jobOfferId: string) {
    try {
      const userId = await this.authService.getUserIdFromToken(request);    
      const user = await this.userService.findOne(userId);    
      
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const jobOfferToUpdate = new JobOffer();
            
      return this.userService.updateJobOffer(userId, jobOfferId, newJobOffer);
    } catch (error) {      
      throw new HttpException('Error de servicio', HttpStatus.INTERNAL_SERVER_ERROR); 
    }
  }

  @Delete('jobOffer/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete job offer', description: 'Delete a job offer' })
  @ApiResponse({ status: 200, description: 'Deleted jobOffer ok', type: UserResponseDto })
  async deleteJobOffer(  @Param('id') jobOfferId: string,  @Req() request: Request
  ) {
    try {
      const userId = await this.authService.getUserIdFromToken(request);    
      const user = await this.userService.findOne(userId);    
      
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }    

      return this.userService.deleteJobOffer(userId, jobOfferId);
    } catch (error) {      
      throw new HttpException('Error de servicio', HttpStatus.INTERNAL_SERVER_ERROR); 
    }
  }

  @Put('changePassword')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'CHange the password of the user', description: 'Change the password of the logged user' })
  @ApiResponse({ status: 200, description: 'Changed password ok', type: UserResponseDto })
  async update(    
    @Body(new ValidationPipe()) updateuser: UserPasswordDto, @Req() request: Request
  ) {
    try {
      const userId = await this.authService.getUserIdFromToken(request);
      const email = await this.authService.getEmailFromToken(request);
      const updatedUser : UserDto = {
        password: updateuser.password,
        email: email
      };    
      return this.userService.update(userId, updatedUser);
    } catch (error) {      
      throw new HttpException('Error de servicio', HttpStatus.INTERNAL_SERVER_ERROR); 
    }
  }

  @Get('list')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List users', description: 'List all users' })
  @ApiResponse({ status: 200, description: 'Returned users ok', type: UserResponseDto })
  async findAll() {
    try {
      return this.userService.findAll();
    } catch (error) {      
      throw new HttpException('Error de servicio', HttpStatus.INTERNAL_SERVER_ERROR); 
    }
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Returned user ok', type: UserResponseDto })
  async findOne(@Param('id') id: string) {
    try {
      return this.userService.findOne(id);
    } catch (error) {      
      throw new HttpException('Error de servicio', HttpStatus.INTERNAL_SERVER_ERROR); 
    }
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Deleted user ok', type: UserResponseDto })
  async delete(@Param('id') id: string) {    
    try {
     return this.userService.delete(id);
    } catch (error) {      
      throw new HttpException('Error de servicio', HttpStatus.INTERNAL_SERVER_ERROR); 
    }
  }
  
  @ApiConsumes('multipart/form-data', 'application/json')  
  @ApiBody({ type: CvPdfDto, required: true })
  @ApiOkResponse({ status: 201 })
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  @Post('uploadCVpdf')
  async saveCVpdf(
    @UploadedFile() cvFile: Express.Multer.File,
    @Body() userId: string, 
    @Req() req: any, @Res() res: Response
  ) {
    try {
    
    //const cv = await this.cvsService.createCV(cvFile, createCVDto);
      return { message: 'CV creado exitosamente' };
    } catch (error) {      
      throw new HttpException('Error de servicio', HttpStatus.INTERNAL_SERVER_ERROR); 
    }
  }


  @Post('sendEmail')    
  @ApiBearerAuth()  
  @ApiOperation({ summary: 'Send an email to verify the account', description: 'Send an email to verify the account' })
  @ApiResponse({ status: 201, description: 'Sent email ok', type: String })
  async sendEmail (    
    @Req() req: Request, @Res() res: Response
  ) {
    try {              
      const config = {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_AUTH_USER,
          pass: process.env.EMAIL_AUTH_PASS
        }
      };

      const userId = await this.authService.getUserIdFromToken(req);    
      const email = await this.authService.getEmailFromToken(req);    
      
      const hostname = req.headers.host;
      const isSecure = req.secure;
      const protocol = isSecure ? 'https' : 'http';
      const currentURL = `${protocol}://${hostname}`;
      console.log(`Current URL: ${currentURL}`);
            
      const verificationLink = currentURL + "/validateEmailByToken/" + userId;      
      
      // Render the HTML email body using the EJS template
      const templatePath = __dirname.replace('user', 'views/validateEmail.ejs');      

      //const templateString = fs.readFileSync(templatePath, 'utf8');
      const templateData  = {
        email: email,
        verificationLink: verificationLink,
      };
      const html = await ejs.renderFile(templatePath, templateData)
      console.log(html);

      // Define email options
      const message = {
        from: 'info@stoical.be',
        to: email,
        subject: 'Verificación de email',
        html: html,
        text: 'hola'
      };
    
      // Send the email
      try {
        const transport = await nodemailer.createTransport(config);
        const info = await transport.sendMail(message);
        console.log('Verification email sent successfully.');
        return 'Verification email sent successfully.';
      } catch (error) {
        console.error('Error sending verification email:', error);
        return 'Error sending verification email.';
      }      

    } catch (error) {      
      console.log(error.message);
      return { message: 'Error Sending message.' };;
    }
  }

}

