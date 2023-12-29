import { IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string
}

