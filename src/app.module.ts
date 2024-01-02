import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { dataSourceOptions } from 'db/data-source';
import { ConfigModule } from '@nestjs/config';
import { Vehicle } from '../entities/vehicle.entity';
import { Booking } from '../entities/booking.entity';
import { User } from 'entities/user.entity';
import { VehicleController } from './vehicle/vehicle.controller';
import { BookingController } from './booking/booking.controller';
import { VehicleService } from './vehicle/vehicle.service';
import { BookingService } from './booking/booking.service';
import { HealthController } from './health/health.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY, 
      signOptions: { expiresIn: '3h' },
    }),
    TypeOrmModule.forFeature([Vehicle, Booking, User]),
  ],

  controllers: [
    AppController,
    VehicleController,
    BookingController,
    HealthController,
    AuthController,
    UsersController
  ],
  providers: [ AppService, VehicleService, BookingService, AuthService, UsersService],
})
export class AppModule {}
