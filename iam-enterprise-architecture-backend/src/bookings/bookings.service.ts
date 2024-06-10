import { Injectable, HttpException, Inject, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from '../typeorm/entities/booking';
import { IntegerType, Repository } from 'typeorm';
import { NewBookingDTO } from './dto/booking.dto';
import { UsersService } from '../users/users.service';
import { JobsService } from '../jobs/jobs.service';


@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(Booking) private readonly bookingRepository: Repository<Booking>,
        private readonly userService: UsersService,
        private readonly jobService: JobsService
    ) { }

    async create(bookingDto: NewBookingDTO, requesterId: number): Promise<Booking> {
        const foundUser = await this.userService.findById(requesterId);
        const foundJob = await this.jobService.findById(bookingDto.job);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const startDate = new Date(bookingDto.startDate);
        const endDate = new Date(bookingDto.endDate);

        if (startDate < today) {
            throw new BadRequestException('Start date cannot be in the past.');
        }

        if (endDate <= startDate) {
            throw new BadRequestException('End date must be at least one day after the start date.');
        }

        const newBooking = new Booking();
        newBooking.requester = foundUser;
        newBooking.job = foundJob;
        newBooking.startDate = startDate;
        newBooking.endDate = endDate;
        newBooking.creationDate = new Date();
        return this.bookingRepository.save(newBooking);
    }

    async findById(id: number): Promise<Booking> {
        console.log('findById called');
        const foundBooking = await this.bookingRepository.findOne({ where: { id }, relations: ["requester", "job"] })
        if (!foundBooking) throw new HttpException("Booking with this id does not exist", 404)
        return foundBooking;
    }

    async findAll(): Promise<Booking[]> {
        return await this.bookingRepository.find({ relations: ["requester", "job"] });
    }

    async delete(id: number) {
        console.log('delete called')
        const foundBooking = await this.bookingRepository.findOne({ where: { id }, relations: ["requester", "job"] })
        if (!foundBooking) throw new HttpException("Booking with this id does not exist", 404)
        else this.bookingRepository.delete(foundBooking);
    }

    async findBookingsByUser(id: number): Promise<Booking[]> {
        const foundUser = await this.userService.findById(id)
        if (!foundUser) {
            throw new HttpException("User with this email does not exist", 404)
        }
        const foundBookings = await this.bookingRepository.find({ where: { requester: foundUser }, relations: ["requester", "job"] });
        return foundBookings;
    }

    async findBookingsByJobs(id: number): Promise<Booking[]> {
        const foundJob = await this.jobService.findById(id)
        if (!foundJob) throw new HttpException("Job with this id does not exist", 404)
        const foundBookings = await this.bookingRepository.find({ where: { job: foundJob }, relations: ["requester", "job"] });
        if (!foundBookings.length) throw new HttpException("There are no bookings with this job!", 404)
        else return foundBookings;
    }

    async findBookingsByUserAndJobs(userId: number, jobId: number): Promise<Booking[]> {
        const foundUser = await this.userService.findById(userId)
        if (!foundUser) {
            throw new HttpException("User with this email does not exist", 404)
        }

        const foundJob = await this.jobService.findById(jobId)
        if (!foundJob) {
            throw new HttpException("Job with this id does not exist", 404)
        }

        const foundBookings = await this.bookingRepository.find({ where: { requester: foundUser, job: foundJob }, relations: ["requester", "job"] })
        console.log(foundBookings)
        return foundBookings;
    }
}