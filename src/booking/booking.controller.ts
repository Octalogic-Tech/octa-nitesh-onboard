import {
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  Req,
  Body,
  Put,
  Param,
  Delete
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { Booking } from '../../entities/booking.entity';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { User } from 'entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthenticatedUser } from 'src/users/user.decorator';


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
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: [User],
  })
  @ApiResponse({
    status: 404,
    description: 'Booking not found',
  })
  getBookings(
    @AuthenticatedUser() authenticatedUser: User, 
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date,
    @Query('userId') userId?: number,
    @Query('vehicle') vehicle?: number,
    @Query('page') page?: number,
  ): Promise<Booking[]> {
    return this.bookingService.getBookings({
      startDate,
      endDate,
      userId: authenticatedUser.id,
      vehicle,
      page,
    });
  }

  @Post('create-booking')
  @ApiOperation({
    summary: 'Create a new booking',
    description: 'Creates a new booking',
  })
  @ApiResponse({
    status: 201,
    description: 'Booking created successfully',
    type: Booking,
  })
  create(@Body() booking: Booking): Promise<Booking> {
    return this.bookingService.create(booking);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a booking by ID',
    description: 'Updates a booking by its ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful response',
    type: Booking,
  })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  update(
    @Param('id') id: string,
    @Body() booking: Booking,
  ): Promise<Booking | undefined> {
    return this.bookingService.update(+id, booking);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a booking by ID',
    description: 'Deletes a booking by its ID',
  })
  @ApiResponse({ status: 204, description: 'Booking deleted successfully' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  remove(@Param('id') id: string): Promise<void> {
    return this.bookingService.remove(+id);
  }
}
