// src/entities/vehicle.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Booking } from './booking.entity';
import { IsNotEmpty, IsString, IsInt, Min, Max } from 'class-validator';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  brand: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  model: string;

  @Column()
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  year: number;

//   @ManyToOne(() => User, (user) => user.vehicles)
//   owner: User;

  @OneToMany(() => Booking, (booking) => booking.vehicle)
  bookings: Booking[];
}
