// booking.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { IsNotEmpty,IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  startDate: String;

  @Column()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  endDate: String;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.bookings)
  vehicle: Vehicle;

  @Column({ nullable: true }) 
  @ApiProperty()
  vehicleId: number;
}
