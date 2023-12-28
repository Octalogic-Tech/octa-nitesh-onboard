// booking.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { IsNotEmpty, IsString } from 'class-validator';
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

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.bookings, { nullable: false })
  @JoinColumn({ name: 'vehicleId' })
  vehicle: Vehicle;

  @Column({ nullable: false })
  @ApiProperty()
  userId: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @ApiProperty()
  updatedAt: Date;
}
