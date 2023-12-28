// booking.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../../entities/booking.entity';
import { FindManyOptions } from 'typeorm';
import { Vehicle } from 'entities/vehicle.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async findAll(): Promise<Booking[]> {
    return this.bookingRepository.find({ relations: ['vehicle'] });
  }

  async getBookings(filter: { startDate?: Date; endDate?: Date; userId?: number; vehicle:number }): Promise<Booking[]> {
    try {
      const where: any = {};
      console.log('+++++++++++++__________++++++++++',filter.vehicle)
      
      if (filter.startDate) {
        where.startDate = filter.startDate;
      }
  
      if (filter.endDate) {
        where.endDate = filter.endDate;
      }
  
      if (filter.userId) {
        where.userId = filter.userId;
      }

      if (filter.vehicle) {
        where.vehicleId = filter.vehicle;
      }

    const findOptions: FindManyOptions<Booking> = {
      where: where,
      relations: ["vehicle"],
    };
      
      return await this.bookingRepository.find(findOptions);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw new Error('An error occurred while fetching bookings.');
    }
  }
  

  // async findById(id: any): Promise<Booking | undefined> {
  //   return this.bookingRepository.findOne(id);
  // }

  // async create(booking: Booking): Promise<Booking> {
  //   try {
  //     console.log('+++++++++++++++++++++++++=', booking);

  //     const newBooking = new Booking();
  //     newBooking.startDate = booking.startDate;
  //     newBooking.endDate = booking.endDate;

  //     newBooking.vehicleId = booking.vehicleId;

  //     const result = await this.bookingRepository.save(newBooking);
  //     console.log('Booking saved successfully:', result);
  //     return result;
  //   } catch (error) {
  //     console.error('Error saving booking:', error);
  //     throw error; // Rethrow the error or handle it appropriately
  //   }
  // }

  // async update(id: any, booking: Booking): Promise<Booking | undefined> {
  //   await this.bookingRepository.update(id, booking);
  //   return this.bookingRepository.findOne(id);
  // }

  // async remove(id: number): Promise<void> {
  //   await this.bookingRepository.delete(id);
  // }
}
