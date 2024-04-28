import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
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
        console.log(foundUser);
        if (!foundUser) {
          return null;
        }
  
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (isMatch) {
        
          const token = await this.generateToken(foundUser);
          return token;
        
        } else {
          return null;
        }
      } catch (exception) {
        throw exception;
      }
  }
  
  async generateToken (user) {
    console.log(user);
    const payload = {
      email: user.email,
      userId: user._id,
    };
    const token = await this.jwtService.signAsync(payload);
    return token;    
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];    
    //const [type, token] = request.headers['authorization']?.split(' ') ?? [];
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

}