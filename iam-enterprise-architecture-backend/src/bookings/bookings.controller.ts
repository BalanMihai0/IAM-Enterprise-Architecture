import { Controller, Body,Delete, Post, Get, Param, UseGuards, Req, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { BookingService } from './bookings.service';
import { NewBookingDTO } from './dto/booking.dto';
import { Roles } from '../auth/roles/roles.decorator';
import { Request } from 'express';



@Controller('bookings')
export class BookingsController{
    constructor (private readonly bookingService:BookingService){}

    @Post()
    @Roles()
    async create(@Body() bookingDto:NewBookingDTO){
        return await this.bookingService.create(bookingDto);
    }

    @Delete(':id')
    @Roles("admin")
    async delete(@Param('id') id: number){
        return await this.bookingService.delete(id);
    }

    @Get()
    async findAll() {
        return await this.bookingService.findAll();
    }

    @Get(':id')
    @Roles()
    async findById(@Param('id') id: number, @Req() req: Request){
        const token : any = req.user;

        if (token.id != id) {
            // If user ID from token does not match the requested ID, return an error
            throw new ForbiddenException("You are not authorized to access this resource.");
        }

        return await this.bookingService.findById(id);
    }
    //  still have to decide on how we manage the other 3 end-points





    // @Get('/user:id')
    // @Roles()
    // async findBookingsByUser(@Param('id') id: number, @Req() req: Request) {
    //     const token : any = req.user;

    //     if (token.id != id) {
    //         // If user ID from token does not match the requested ID, return an error
    //         throw new ForbiddenException("You are not authorized to access this resource.");
    //     }

    //     return await this.bookingService.findBookingsByUser(id);
    // }

    // @Get('/job/:id')
    // @Roles()
    // async findBookingsByJobs(@Param('id') id: number){
    //     return await this.bookingService.findBookingsByJobs(id);
    // }

    // @Get('/user:userid/job:jobid')
    // @Roles()
    // async findBookingsByUserAndJobs()
    

}