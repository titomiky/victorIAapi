import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/schemas/user.schema';
import { Model } from 'mongoose';
import { Request } from 'express';


@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async signIn(email: string, password: string): Promise<any> {
    try {      
      const foundUser = await this.userService.findByEmail(email);          
      if (!foundUser) {
        throw new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
      }
      
      const isMatch = await bcrypt.compare(password, foundUser.password);
      if (isMatch) {
        const token = await this.generateToken(foundUser);
        return token;
      } else {
        throw new HttpException('Credenciales inválidas', HttpStatus.BAD_REQUEST);
      }
    } catch (exception) {
      throw new HttpException('Error en el servicio', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
  

  async generateToken (user) {    
    let  onboarding = (user.clientUser && typeof user.clientUser === 'object') || (user.adminUser && typeof user.adminUser === 'object') || (user.candidateUser && typeof user.candidateUser === 'object');
    if (onboarding === undefined) onboarding = true;
    else onboarding = false;
    
    let role = '';
    if (user.adminUser && typeof user.adminUser === 'object')  role = 'admin';    
    if (user.clientUser && typeof user.clientUser === 'object') role = 'client';
    if (user.candidateUser && typeof user.candidateUser === 'object') role = 'candidate';
    
    
    const payload = {
      name: this.getName(user),
      surname: this.getSurname(user),
      email: user.email,
      userId: user._id,
      onBoarding: onboarding,
      role: role,
    };
    const token = await this.jwtService.signAsync(payload);
    return token;    
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];        
    return type === 'Bearer' ? token : undefined;
  }
  
  public async getUserIdFromToken(request: Request): Promise<string> {
                
    const token = this.extractTokenFromHeader(request);
    if (!token) {
        return null;
    }
    try {
        const payload = await this.jwtService.verifyAsync(
        token,
        {
            secret: process.env.JWT_SECRET,
        }
        );
        return payload.userId;
    } catch {
        return null;
    }
  } 

  public async getEmailFromToken(request: Request): Promise<string> {
                
    const token = this.extractTokenFromHeader(request);
    if (!token) {
        return null;
    }
    try {
        const payload = await this.jwtService.verifyAsync(
        token,
        {
            secret: process.env.JWT_SECRET,
        }
        );
        return payload.email;
    } catch {
        return null;
    }
  }

  getName (user: User): string {
    let name: string;
  
    if (user.adminUser) {
      name = user.adminUser.name;
    } else if (user.clientUser) {
      name = user.clientUser.name;
    } else if (user.candidateUser) {
      name = user.candidateUser.name;
    } else {
      name = null; // Or any default value if none of the users exist
    }
    return name;
  }

  getSurname (user: User): string {
    let surname: string;
  
    if (user.adminUser) {
      surname = user.adminUser.name;
    } else if (user.clientUser) {
      surname = user.clientUser.name;
    } else if (user.candidateUser) {
      surname = user.candidateUser.name;
    } else {
      surname = null; // Or any default value if none of the users exist
    }
    return surname;
  }
}