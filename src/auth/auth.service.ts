import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/schemas/user.schema';
import { Model } from 'mongoose';

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
}