import { Injectable,HttpException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from '../typeorm/entities/booking';
import { Repository } from 'typeorm';
import { NewBookingDTO } from './dto/booking.dto';
import { UsersService } from '../users/users.service';
import { JobsService } from '../jobs/jobs.service';


@Injectable()
export class BookingService{
    constructor(
        @InjectRepository(Booking) private readonly bookingRepository: Repository<Booking>,
        private readonly userService:UsersService,
        private readonly jobService:JobsService
    ){}

    async create(bookingDto:NewBookingDTO):Promise<Booking>{
        const foundUser = await this.userService.findById(bookingDto.requester)
        const foundJob = await this.jobService.findById(bookingDto.job)
        const currentDate = new Date();
        if(foundJob.start_date < currentDate || foundJob.end_date < currentDate )throw new HttpException("Error on start or end date!", 400)
        const NewBooking=this.bookingRepository.create({
            requester:foundUser,
            job:foundJob
        });
        return this.bookingRepository.save(NewBooking);
    }

    async findById(id:number):Promise<Booking>{
        const foundBooking=await this.bookingRepository.findOne({where:{id}})
        if (!foundBooking) throw new HttpException("Booking with this id does not exist", 404)
            return foundBooking;
    }

    async findAll(): Promise<Booking[]> {
        return await this.bookingRepository.find();
    } 

    async delete(id:number){
        const foundBooking=await this.bookingRepository.findOne({where:{id}})
        if (!foundBooking) throw new HttpException("Booking with this id does not exist", 404)
            else this.bookingRepository.delete(foundBooking);
    }

    async findBookingsByUser(id:number): Promise<Booking[]>{
        const foundUser = await this.userService.findById(id)
        if (!foundUser) throw new HttpException("User with this email does not exist", 404)
        const foundBookings = await this.bookingRepository.find({ where: { requester: foundUser } });
        if (!foundBookings.length) throw new HttpException("There are no bookings made by this user!",404)
        else return foundBookings;
    }

    async findBookingsByJobs(id:number):Promise<Booking[]>{
        const foundJob=await this.jobService.findById(id)
        if (!foundJob) throw new HttpException("Job with this id does not exist", 404)
        const foundBookings = await this.bookingRepository.find({ where: { job: foundJob } }); 
        if (!foundBookings.length) throw new HttpException("There are no bookings with this job!",404)
            else return foundBookings;
    }

    async findBookingsByUserAndJobs(userId:number,jobId:number):Promise<Booking[]>{
        const foundUser = await this.userService.findById(userId)
        if (!foundUser) throw new HttpException("User with this email does not exist", 404)
            const foundJob=await this.jobService.findById(jobId)
        if (!foundJob) throw new HttpException("Job with this id does not exist", 404) 
        const foundBookings = await this.bookingRepository.find({where : {requester:foundUser,job:foundJob}})
        if (!foundBookings.length) throw new HttpException("There are no bookings with this job!",404)
            else return foundBookings; 
    }
}