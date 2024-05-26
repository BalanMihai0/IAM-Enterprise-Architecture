import { Booking } from '../typeorm/entities/booking';
import { Repository } from 'typeorm';
import { NewBookingDTO } from './dto/booking.dto';
import { UsersService } from '../users/users.service';
import { JobsService } from '../jobs/jobs.service';
export declare class BookingService {
    private readonly bookingRepository;
    private readonly userService;
    private readonly jobService;
    constructor(bookingRepository: Repository<Booking>, userService: UsersService, jobService: JobsService);
    create(bookingDto: NewBookingDTO): Promise<Booking>;
    findById(id: number): Promise<Booking>;
    findAll(): Promise<Booking[]>;
    delete(id: number): Promise<void>;
    findBookingsByUser(id: number): Promise<Booking[]>;
    findBookingsByJobs(id: number): Promise<Booking[]>;
    findBookingsByUserAndJobs(userId: number, jobId: number): Promise<Booking[]>;
}
