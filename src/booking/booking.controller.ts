// booking.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Booking } from '../../entities/booking.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('bookings')

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  findAll(): Promise<Booking[]> {
    return this.bookingService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Booking | undefined> {
    return this.bookingService.findById(+id);
  }

  @Post()
  create(@Body() booking: Booking): Promise<Booking> {
    return this.bookingService.create(booking);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() booking: Booking): Promise<Booking | undefined> {
    return this.bookingService.update(+id, booking);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.bookingService.remove(+id);
  }
}
