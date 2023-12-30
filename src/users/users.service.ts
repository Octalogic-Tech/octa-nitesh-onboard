import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.manager.transaction(async (transactionalEntityManager) => {
      const chkUser = await this.usersRepository.findOne({ where: { username: createUserDto.username } });
      const hashedPassword = await argon2.hash(createUserDto.password);

      if (chkUser) {
        throw new BadRequestException('Username already exists');
      }
      
      createUserDto.password = hashedPassword;
      const newUser = this.usersRepository.create(createUserDto);
      const errors = await validate(newUser);
      if (errors.length > 0) {
        throw new BadRequestException({ message: 'Validation failed', errors });
      }

      return transactionalEntityManager.save(newUser);
    });
  }

  

  // findAll() {
  //   return this.usersRepository.find();
  // }

  // findOne(id: number) {
  //   return this.usersRepository.findOneBy({ id });
  // }

  // async update(id: number, updateUserDto: UpdateUserDto) {
  //   const user = await this.findOne(id);

  //   if (!user) {
  //     throw new BadRequestException({ message: 'User not found' });
  //   }

  //   const updatedUser = this.usersRepository.merge(user, updateUserDto);

  //   const errors = await validate(updatedUser);
  //   if (errors.length > 0) {
  //     throw new BadRequestException({ message: 'Validation failed', errors });
  //   }

  //   return this.usersRepository.save(updatedUser);
  // }

  // async remove(id: number) {
  //   const user = await this.findOne(id);

  //   if (!user) {
  //     throw new BadRequestException({ message: 'User not found' });
  //   }

  //   return this.usersRepository.remove(user);
  // }
}
