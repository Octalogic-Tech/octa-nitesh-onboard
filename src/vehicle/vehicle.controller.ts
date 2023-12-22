// vehicle.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { Vehicle } from '../../entities/vehicle.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  findAll(): Promise<Vehicle[]> {
    return this.vehicleService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Vehicle | undefined> {
    return this.vehicleService.findById(+id);
  }

  @Post()
  create(@Body() vehicle: Vehicle): Promise<Vehicle> {
    return this.vehicleService.create(vehicle);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() vehicle: Vehicle): Promise<Vehicle | undefined> {
    return this.vehicleService.update(+id, vehicle);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.vehicleService.remove(+id);
  }
}
