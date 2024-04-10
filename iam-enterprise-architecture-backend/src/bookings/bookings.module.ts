import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/typeorm/entities/booking';
import { BookingService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { UsersModule } from '../users/users.module';
import { JobsModule } from '../jobs/jobs.module';
import { User } from 'src/typeorm/entities/user';
import { Job } from 'src/typeorm/entities/job';

@Module({
    imports: [TypeOrmModule.forFeature([Booking, User, Job]), UsersModule, JobsModule],
  controllers: [BookingsController],
  providers: [BookingService],
  exports: [BookingService]
})
export class BookingsModule {}