import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { dataSourceOptions } from 'db/data-source';
import { ConfigModule } from '@nestjs/config';
import { Vehicle } from '../entities/vehicle.entity';
import { Booking } from '../entities/booking.entity';
import { VehicleController } from './vehicle/vehicle.controller';
import { BookingController } from './booking/booking.controller';
import { VehicleService } from './vehicle/vehicle.service';
import { BookingService } from './booking/booking.service';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([Vehicle, Booking]),
  ],

  controllers: [
    AppController,
    VehicleController,
    BookingController,
    HealthController,
  ],
  providers: [AppService, VehicleService, BookingService],
})
export class AppModule {}
