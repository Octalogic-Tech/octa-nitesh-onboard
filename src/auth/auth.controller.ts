// auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiTags, ApiBody, ApiResponse, ApiOperation } from '@nestjs/swagger';
import * as argon2 from 'argon2';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Users Signup',
    description: 'Returns a User',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: User,
  })
  async signup(@Body() createUserDto: CreateUserDto) {
    try {
      if (!createUserDto) {
        return { message: 'Body should not be empty' };
      }
      const result = await this.authService.signup(createUserDto);

      return result;
    } catch (error) {
      return { message: error.message };
    }
  }
}
