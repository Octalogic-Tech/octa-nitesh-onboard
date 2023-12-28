import {
  Controller,
  Get,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { Booking } from '../../entities/booking.entity';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Vehicle } from 'entities/vehicle.entity';

@ApiTags('bookings')
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all bookings',
    description: 'Returns an array of bookings',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: [Booking],
  })
  findAll(): Promise<Booking[]> {
    return this.bookingService.findAll();
  }

  @Get('filter')
  getBookings(
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date,
    @Query('userId') userId?: number,
    @Query('vehicle') vehicle?: number
  ): Promise<Booking[]> {
    return this.bookingService.getBookings({ startDate, endDate, userId, vehicle});
  }

  // Uncomment and adjust the following routes if needed
  // @Post()
  // @ApiOperation({
  //   summary: 'Create a new booking',
  //   description: 'Creates a new booking',
  // })
  // @ApiResponse({
  //   status: 201,
  //   description: 'Booking created successfully',
  //   type: Booking,
  // })
  // create(@Body() booking: Booking): Promise<Booking> {
  //   return this.bookingService.create(booking);
  // }

  // @Put(':id')
  // @ApiOperation({
  //   summary: 'Update a booking by ID',
  //   description: 'Updates a booking by its ID',
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Successful response',
  //   type: Booking,
  // })
  // @ApiResponse({ status: 404, description: 'Booking not found' })
  // update(
  //   @Param('id') id: string,
  //   @Body() booking: Booking,
  // ): Promise<Booking | undefined> {
  //   return this.bookingService.update(+id, booking);
  // }

  // @Delete(':id')
  // @ApiOperation({
  //   summary: 'Delete a booking by ID',
  //   description: 'Deletes a booking by its ID',
  // })
  // @ApiResponse({ status: 204, description: 'Booking deleted successfully' })
  // @ApiResponse({ status: 404, description: 'Booking not found' })
  // remove(@Param('id') id: string): Promise<void> {
  //   return this.bookingService.remove(+id);
  // }
}
