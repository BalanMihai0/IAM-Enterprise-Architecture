import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/typeorm/entities/booking';
import { BookingService } from './bookings.service';
import { BookingsController } from './bookings.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Booking])],
  controllers: [BookingsController],
  providers: [BookingService],
  exports: [BookingService]
})
export class BookingsMosule{}