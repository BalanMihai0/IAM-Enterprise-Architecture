import { Controller, Body, Delete, Post, Get, Param, UseGuards, Req, UnauthorizedException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { BookingService } from './bookings.service';
import { NewBookingDTO } from './dto/booking.dto';
import { Roles } from '../auth/roles/roles.decorator';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { validate } from 'class-validator';
import { Booking } from 'src/typeorm/entities/booking';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController{
    constructor (private readonly bookingService:BookingService) {}

    @Post()
    @Roles("admin", "customer")
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async create(@Body() bookingDto: NewBookingDTO, @Req() req: Request){

        const token: any = req.user;

        const errors = await validate(bookingDto);
        if (errors.length > 0) {
            throw new BadRequestException(errors);
        }
        
        const requesterId = token.unique_name;
        return await this.bookingService.create(bookingDto, requesterId);
    }

    @Delete(':id')
    @Roles("admin")
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async delete(@Param('id') id: number, @Req() req: Request){
        return await this.bookingService.delete(id);
    }

    @Get()
    @Roles("admin")
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async findAll() {
        return await this.bookingService.findAll();
    }

    @Get(':id')
    @Roles("admin", "customer")
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async findById(@Param('id') id: number, @Req() req: Request){
        const token : any = req.user;

        const booking : Booking = await this.bookingService.findById(id);
        if (token.unique_name != booking.requester.id && token.role != "admin") {
            throw new ForbiddenException("You are not authorized to access this resource.");
        }

        return booking;
    }

    @Get('/user:id')
    @Roles("admin", "customer")
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async findBookingsByUser(@Param('id') id: number, @Req() req: Request) {
        const token : any = req.user;

        if (token.unique_name != id) {
            throw new ForbiddenException("You are not authorized to access this resource.");
        }

        return await this.bookingService.findBookingsByUser(id);
    }
    
    @Get('/job/:id')
    @Roles("admin", "customer")
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async findBookingsByJob(@Param('id') id: number, @Req() req: Request){
        const token : any = req.user;

        if (token.unique_name != id) {
            throw new ForbiddenException("You are not authorized to access this resource.");
        }

        return await this.bookingService.findBookingsByJobs(id);
    }


    @Get('/user:userid/job:jobid')
    @Roles("admin", "customer")
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async findBookingsByUserAndJobs(@Param('userId') userId: number,@Param('jobId') jobId: number,@Req() req: Request){
        const token : any = req.user;

        if (token.unique_name != userId) {
            throw new ForbiddenException("You are not authorized to access this resource.");
        }

        return await this.bookingService.findBookingsByUserAndJobs(userId,jobId);
    }


}