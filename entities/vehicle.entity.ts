// src/entities/vehicle.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Booking } from './booking.entity';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  year: number;

//   @ManyToOne(() => User, (user) => user.vehicles)
//   owner: User;

  @OneToMany(() => Booking, (booking) => booking.vehicle)
  bookings: Booking[];
}
