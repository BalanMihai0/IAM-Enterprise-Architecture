"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const booking_1 = require("../typeorm/entities/booking");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
const jobs_service_1 = require("../jobs/jobs.service");
let BookingService = class BookingService {
    constructor(bookingRepository, userService, jobService) {
        this.bookingRepository = bookingRepository;
        this.userService = userService;
        this.jobService = jobService;
    }
    async create(bookingDto) {
        const foundUser = await this.userService.findById(bookingDto.requester);
        const foundJob = await this.jobService.findById(bookingDto.job);
        const newBooking = new booking_1.Booking();
        newBooking.requester = foundUser;
        newBooking.job = foundJob;
        newBooking.startDate = new Date(bookingDto.startDate);
        newBooking.endDate = new Date(bookingDto.endDate);
        const currentDate = new Date();
        newBooking.creationDate = new Date();
        return this.bookingRepository.save(newBooking);
    }
    async findById(id) {
        const foundBooking = await this.bookingRepository.findOne({ where: { id }, relations: ["requester", "job"] });
        if (!foundBooking)
            throw new common_1.HttpException("Booking with this id does not exist", 404);
        return foundBooking;
    }
    async findAll() {
        return await this.bookingRepository.find({ relations: ["requester", "job"] });
    }
    async delete(id) {
        const foundBooking = await this.bookingRepository.findOne({ where: { id } });
        if (!foundBooking)
            throw new common_1.HttpException("Booking with this id does not exist", 404);
        else
            this.bookingRepository.delete(foundBooking);
    }
    async findBookingsByUser(id) {
        const foundUser = await this.userService.findById(id);
        if (!foundUser)
            throw new common_1.HttpException("User with this email does not exist", 404);
        const foundBookings = await this.bookingRepository.find({ where: { requester: foundUser } });
        if (!foundBookings.length)
            throw new common_1.HttpException("There are no bookings made by this user!", 404);
        else
            return foundBookings;
    }
    async findBookingsByJobs(id) {
        const foundJob = await this.jobService.findById(id);
        if (!foundJob)
            throw new common_1.HttpException("Job with this id does not exist", 404);
        const foundBookings = await this.bookingRepository.find({ where: { job: foundJob } });
        if (!foundBookings.length)
            throw new common_1.HttpException("There are no bookings with this job!", 404);
        else
            return foundBookings;
    }
    async findBookingsByUserAndJobs(userId, jobId) {
        const foundUser = await this.userService.findById(userId);
        if (!foundUser)
            throw new common_1.HttpException("User with this email does not exist", 404);
        const foundJob = await this.jobService.findById(jobId);
        if (!foundJob)
            throw new common_1.HttpException("Job with this id does not exist", 404);
        const foundBookings = await this.bookingRepository.find({ where: { requester: foundUser, job: foundJob } });
        if (!foundBookings.length)
            throw new common_1.HttpException("There are no bookings with this job!", 404);
        else
            return foundBookings;
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(booking_1.Booking)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        jobs_service_1.JobsService])
], BookingService);
//# sourceMappingURL=bookings.service.js.map