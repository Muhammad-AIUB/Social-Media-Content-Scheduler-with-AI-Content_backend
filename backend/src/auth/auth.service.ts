/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

// Define a simpler user interface
interface UserData {
  _id: any; // Use just 'any' instead of 'string | any'
  email: string;
  role: string;
  [key: string]: any;
}

interface JwtPayload {
  email: string;
  sub: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  login(user: any) {
    // Use optional chaining to safely access _id
    const id = user._id?.toString() || user._id;
    
    const payload: JwtPayload = { 
      email: user.email as string, 
      sub: id as string, 
      role: user.role as string 
    };
    
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userData: CreateUserDto) {
    const newUser = await this.usersService.create(userData);
    
    // Access the document as a plain object
    const { password, ...result } = newUser as any;
    
    // Use optional chaining to safely access _id
    const id = result._id?.toString() || result._id;
    
    const payload: JwtPayload = { 
      email: result.email as string, 
      sub: id as string, 
      role: result.role as string 
    };
    
    return {
      user: result,
      access_token: this.jwtService.sign(payload),
    };
  }
} 