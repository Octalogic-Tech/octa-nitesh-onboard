import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../../entities/booking.entity';
import { FindManyOptions, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async findAll(): Promise<Booking[]> {
    return this.bookingRepository.find({ relations: ['vehicle'] });
  }

  async getBookings(filter: { startDate?: Date; endDate?: Date; userId?: number; vehicle: number, page: number }): Promise<any[]> {
    try {
      const where: any = {};
      
      const pageSize = 30;
      const skip = (filter.page - 1) * pageSize;

      if (filter.startDate) {
        where.startDate = filter.startDate;
        where.startDate = MoreThanOrEqual(filter.startDate);
      }
  
      if (filter.endDate) {
        where.endDate = LessThanOrEqual(filter.endDate);
      }
  
      if (filter.userId) {
        where.userId = filter.userId;
      }
  
      if (filter.vehicle) {
        where.vehicleId = filter.vehicle;
      }
  
      const findOptions: FindManyOptions<Booking> = {
        where,
        relations: ["vehicle", "user"],
        skip,
        take: pageSize,
        select: {
          id: true,
          startDate: true,
          endDate: true,
          user: {
            lastName: true,
            firstName: true,
          },
          vehicle: {
            brand: true,
            model: true,
          },
        },
      };
      
      const bookings: Booking[] = await this.bookingRepository.find(findOptions);
      return bookings;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw new Error('An error occurred while fetching bookings.');
    }
  }
  
  
  

  async findById(id: any): Promise<Booking | undefined> {
    return this.bookingRepository.findOne(id);
  }

  async create(booking: Booking): Promise<Booking> {
    try {
      console.log('+++++++++++++++++++++++++=', booking);

      const newBooking = new Booking();
      newBooking.startDate = booking.startDate;
      newBooking.endDate = booking.endDate;

      newBooking.vehicle = booking.vehicle;

      const result = await this.bookingRepository.save(newBooking);
      console.log('Booking saved successfully:', result);
      return result;
    } catch (error) {
      console.error('Error saving booking:', error);
      throw error; 
    }
  }

  async update(id: any, booking: Booking): Promise<Booking | undefined> {
    await this.bookingRepository.update(id, booking);
    return this.bookingRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.bookingRepository.delete(id);
  }
}
