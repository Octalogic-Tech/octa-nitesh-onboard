// booking.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { IsNotEmpty,IsString, IsDate } from 'class-validator';
@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  startDate: String;

  @Column()
  @IsString()
  @IsNotEmpty()
  endDate: String;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.bookings)
  vehicle: Vehicle;

  @Column({ nullable: true }) // Add this line for vehicleId column
  vehicleId: number; // Add this line for vehicleId column
}
