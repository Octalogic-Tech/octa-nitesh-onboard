import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm';
import { User } from './user.entity';
import { Booking } from './booking.entity';
import { IsNotEmpty, IsString, IsInt, Min, Max } from 'class-validator';

@Entity()
@Unique(['brand', 'model', 'year'])
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

  @Column({ type: 'int', default: 5 }) 
  quantity: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // @ManyToOne(() => User, (user) => user.vehicles)
  // owner: User;

  @OneToMany(() => Booking, (booking) => booking.vehicle)
  bookings: Booking[];
}
