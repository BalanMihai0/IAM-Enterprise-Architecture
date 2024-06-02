import { BookingService } from './bookings.service';
import { NewBookingDTO } from './dto/booking.dto';
import { Request } from 'express';
import { Booking } from 'src/typeorm/entities/booking';
export declare class BookingsController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    create(bookingDto: NewBookingDTO, req: Request): Promise<Booking>;
    delete(id: number, req: Request): Promise<void>;
    findAll(): Promise<Booking[]>;
    findById(id: number, req: Request): Promise<Booking>;
    findBookingsByUser(id: number, req: Request): Promise<Booking[]>;
    findBookingsByJob(id: number, req: Request): Promise<Booking[]>;
    findBookingsByUserAndJobs(userId: number, jobId: number, req: Request): Promise<Booking[]>;
}
