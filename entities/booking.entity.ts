// booking.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Vehicle } from './vehicle.entity';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';
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
  startDate: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  endDate: string;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.bookings)
  vehicle: Vehicle;

  // @ManyToOne(() => User, (user) => user.bookings)
  // user: User;

  @Column({ nullable: false }) 
  @ApiProperty()
  userId: number;

  @Column({ nullable: false }) 
  @ApiProperty()
  vehicleId: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  updatedAt: Date;
}
