// vehicle.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../../entities/vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

//   async findAll(): Promise<Vehicle[]> {
//     return this.vehicleRepository.find();
//   }

//   async findById(id: number): Promise<Vehicle | undefined> {
//     return this.vehicleRepository.findOne(id);
//   }

//   async create(vehicle: Vehicle): Promise<Vehicle> {
//     return this.vehicleRepository.save(vehicle);
//   }

//   async update(id: number, vehicle: Vehicle): Promise<Vehicle | undefined> {
//     await this.vehicleRepository.update(id, vehicle);
//     return this.vehicleRepository.findOne(id);
//   }

  async remove(id: number): Promise<void> {
    await this.vehicleRepository.delete(id);
  }
}
