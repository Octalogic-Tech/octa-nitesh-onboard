import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as argon2 from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const createdUser = await this.usersService.create(createUserDto);

    return {
      username: createdUser.username,
      sub: createdUser.id,
    };
  }

  validateToken(token: string) {

    return this.jwtService.verify(token, {  
      secret: process.env.JWT_SECRET_KEY,
    });
  }

  async login(username: string, password: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user || !(await argon2.verify(user.password, password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokenPayload = this.createTokenPayload(user.username, user.id);
    const token = this.jwtService.sign(tokenPayload);

    return token;
  }

  private createTokenPayload(username: string, userId: number) {
    return { username, sub: userId };
  }
}
