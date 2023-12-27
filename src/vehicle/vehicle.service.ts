// vehicle.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Vehicle } from '../../entities/vehicle.entity';
import { Booking } from '../../entities/booking.entity';
import { format } from 'date-fns';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async findAll(): Promise<Vehicle[]> {
    const today = new Date();
    const formattedToday = format(today, 'yyyy-MM-dd');

    const bookedVehicleIds = (await this.bookingRepository.find()).map(
      (booking) => booking.vehicle,
    );
    return this.vehicleRepository.find({
      where: {
        id: Not(bookedVehicleIds as any),
        bookings: {
          endDate: MoreThanOrEqual(formattedToday),
          startDate: LessThanOrEqual(formattedToday),
        },
      },
      join: {
        alias: 'vehicle',
        leftJoinAndSelect: {
          bookings: 'vehicle.bookings',
        },
      },
    });
  }

  async findById(id: any): Promise<Vehicle | undefined> {
    return this.vehicleRepository.findOne(id);
  }

  async create(vehicle: Vehicle): Promise<Vehicle> {
    return this.vehicleRepository.save(vehicle);
  }

  async update(id: any, vehicle: Vehicle): Promise<Vehicle | undefined> {
    await this.vehicleRepository.update(id, vehicle);
    return this.vehicleRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.vehicleRepository.delete(id);
  }
}
