// auth.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }


  async signup(createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findByUsername(createUserDto.username);

    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    const createdUser = await this.usersService.create(createUserDto);

    const payload = { username: createdUser.username, sub: createdUser.id };
  
    return payload;
  }

}
