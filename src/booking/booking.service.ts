// booking.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../../entities/booking.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

//   async findAll(): Promise<Booking[]> {
//     return this.bookingRepository.find();
//   }

//   async findById(id: number): Promise<Booking | undefined> {
//     return this.bookingRepository.findOne(id);
//   }

//   async create(booking: Booking): Promise<Booking> {
//     return this.bookingRepository.save(booking);
//   }

//   async update(id: number, booking: Booking): Promise<Booking | undefined> {
//     await this.bookingRepository.update(id, booking);
//     // return this.bookingRepository.findOne(id);
//   }

//   async remove(id: number): Promise<void> {
//     await this.bookingRepository.delete(id);
//   }
}
