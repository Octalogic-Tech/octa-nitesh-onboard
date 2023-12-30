import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as argon2 from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { User } from 'entities/user.entity';

@Injectable()
export class AuthService {
  private readonly jwtSecret: string = 'your-secret-key';
  constructor(
    private usersService: UsersService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const createdUser = await this.usersService.create(createUserDto);

    return {
      username: createdUser.username,
      sub: createdUser.id,
    };
  }

  async login(username: string, password: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { username: username } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.generateJwtToken(user.username, user.id);

    return token;
  }

  private generateJwtToken(username: string, userId: number): string {
    const payload = { username, sub: userId };
    return jwt.sign(payload, this.jwtSecret, { expiresIn: '3h' }); 
  }
}
