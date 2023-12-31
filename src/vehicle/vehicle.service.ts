// vehicle.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, In, MoreThanOrEqual } from 'typeorm';
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
    const formattedToday = format(today, 'yyyy-MM-dd HH:mm:ss.SSSSSS');
    console.log(formattedToday)
    
    const bookedVehicles = await this.bookingRepository.find({
      where: {
        endDate: MoreThanOrEqual(formattedToday),
      },
      relations: ['vehicle'],
    }); 
    const bookedVehicleIds = bookedVehicles
      .filter((booking) => booking.vehicle) 
      .map((booking) => booking.vehicle.id);

    return this.vehicleRepository.find({
      where: {
        id: Not(In(bookedVehicleIds)),
      },
    });
  }
  
  // async findById(id: any): Promise<Vehicle | undefined> {
  //   return this.vehicleRepository.findOne(id);
  // }

  // async create(vehicle: Vehicle): Promise<Vehicle> {
  //   return this.vehicleRepository.save(vehicle);
  // }

  // async update(id: any, vehicle: Vehicle): Promise<Vehicle | undefined> {
  //   await this.vehicleRepository.update(id, vehicle);
  //   return this.vehicleRepository.findOne(id);
  // }

  // async remove(id: number): Promise<void> {
  //   await this.vehicleRepository.delete(id);
  // }
}
