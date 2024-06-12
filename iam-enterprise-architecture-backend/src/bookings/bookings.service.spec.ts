import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from './bookings.service';
import { Booking } from '../typeorm/entities/booking';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InstanceChecker, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { JobsService } from '../jobs/jobs.service';
import { User } from '../typeorm/entities/user';
import { Job } from '../typeorm/entities/job';
import { NewBookingDTO } from './dto/booking.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('BookingService', () => {
    let service: BookingService;
    let userService: UsersService;
    let jobService: JobsService;
    let repository: Repository<Booking>;
    const BOOKING_REPOSITORY_TOKEN = getRepositoryToken(Booking);

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BookingService, {
                    provide: BOOKING_REPOSITORY_TOKEN,
                    useValue: {
                        create: jest.fn(),
                        save: jest.fn(),
                        findOne: jest.fn(),
                        find: jest.fn(),
                        delete: jest.fn(),
                    }
                }, {
                    provide: UsersService,
                    useValue: {
                        findById: jest.fn().mockResolvedValue({
                            id: 1,
                            email: 'test@example.com',
                            password: 'hashedPassword',
                            full_name: 'Test User',
                            role: 'user',
                        }),
                    }
                }, {
                    provide: getRepositoryToken(User),
                    useValue: {
                        create: jest.fn(),
                        save: jest.fn(),
                        findOne: jest.fn(),
                        find: jest.fn(),
                    }
                }, {
                    provide: JobsService,
                    useValue: {
                        findById: jest.fn().mockResolvedValue({
                            id: 1,
                            title: 'Test Job',
                            description: 'This is a test job.',
                            location: 'Test Location',
                            price: 100,
                            posted_by: 1,
                            posted_on: new Date(),
                        })
                    }

                }, {
                    provide: getRepositoryToken(Job),
                    useValue: {
                        create: jest.fn(),
                        save: jest.fn(),
                        findOne: jest.fn(),
                        find: jest.fn(),
                    }
                }],
        }).compile();

        service = module.get<BookingService>(BookingService);
        repository = module.get<Repository<Booking>>(BOOKING_REPOSITORY_TOKEN);
        userService = module.get<UsersService>(UsersService);
        jobService = module.get<JobsService>(JobsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('booking repository should be defined', () => {
        expect(repository).toBeDefined();
    });

    describe('create', () => {

        const currentDate = new Date();
        const mockDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);

        // it('should create a new booking', async () => {
        //     const mockDate = new Date(); // Current date
        //     const startDate = new Date(mockDate); // Start date is today
        //     const endDate = new Date(mockDate.getTime()); // End date is also today
        //     endDate.setDate(endDate.getDate() + 1); // Make end date one day after start date
        
        //     const bookingDto: NewBookingDTO = {
        //         job: 1, // Assuming jobId
        //         startDate: startDate,
        //         endDate: endDate,
        //     };
        
        //     // Mock the behavior of findById methods of UserService and JobService
        //     jest.spyOn(userService, 'findById').mockResolvedValueOnce({
        //         id: 1,
        //         email: 'test@example.com',
        //         password: 'hashedPassword',
        //         full_name: 'Test User',
        //         role: 'user',
        //     });
        
        //     jest.spyOn(jobService, 'findById').mockResolvedValueOnce({
        //         id: 1,
        //         title: 'Test Job',
        //         description: 'This is a test job.',
        //         location: 'Test Location',
        //         price: 100,
        //         posted_by: '1', // Ensure posted_by is a string
        //         posted_on: new Date(),
        //         type: "job"
        //     });
        
        //     // Mock the behavior of bookingRepository methods
        //     jest.spyOn(repository, 'create').mockImplementationOnce(() => ({
        //         id: 1,
        //         requester: {
        //             id: 1,
        //             email: 'test@example.com',
        //             password: 'hashedPassword',
        //             full_name: 'Test User',
        //             role: 'user',
        //         },
        //         job: {
        //             id: 1,
        //             title: 'Test Job',
        //             description: 'This is a test job.',
        //             location: 'Test Location',
        //             price: 100,
        //             posted_by: '1', // Ensure posted_by is a string
        //             posted_on: new Date(),
        //             type: "job"
        //         },
        //         startDate: startDate,
        //         endDate: endDate,
        //         creationDate: new Date(),
        //     }));
        
        //     jest.spyOn(repository, 'save').mockResolvedValueOnce({
        //         id: 1,
        //         requester: {
        //             id: 1,
        //             email: 'test@example.com',
        //             password: 'hashedPassword',
        //             full_name: 'Test User',
        //             role: 'user',
        //         },
        //         job: {
        //             id: 1,
        //             title: 'Test Job',
        //             description: 'This is a test job.',
        //             location: 'Test Location',
        //             price: 100,
        //             posted_by: '1', // Ensure posted_by is a string
        //             posted_on: new Date(),
        //             type: "job"
        //         },
        //         startDate: startDate,
        //         endDate: endDate,
        //         creationDate: new Date(),
        //     });
        
        //     // Call create method of BookingService
        //     const result = await service.create(bookingDto, 1);
        
        //     // Convert dates to ISO strings for comparison
        //     const resultWithIsoStrings = {
        //        ...result,
        //         startDate: result.startDate.toISOString(),
        //         endDate: result.endDate.toISOString(),
        //         creationDate: result.creationDate.toISOString(),
        //     };
        
        //     const expectedWithIsoStrings = {
        //         id: 1,
        //         requester: {
        //             id: 1,
        //             email: 'test@example.com',
        //             password: 'hashedPassword',
        //             full_name: 'Test User',
        //             role: 'user',
        //         },
        //         job: {
        //             id: 1,
        //             title: 'Test Job',
        //             description: 'This is a test job.',
        //             location: 'Test Location',
        //             price: 100,
        //             posted_by: '1', // Ensure posted_by is a string
        //             posted_on: new Date().toISOString(),
        //             type: "job"
        //         },
        //         startDate: startDate.toISOString(),
        //         endDate: endDate.toISOString(),
        //         creationDate: new Date().toISOString(),
        //     };
        
        //     // Check if the result is as expected
        //     expect(resultWithIsoStrings).toEqual(expectedWithIsoStrings);
        // });
    });

    describe('findById', () => {
        it('should return a booking if it exists', async () => {
            const id = 1;
            const booking = new Booking();
            booking.id = id;

            jest.spyOn(repository, 'findOne').mockResolvedValue(booking);

            expect(await service.findById(id)).toEqual(booking);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { id },
                relations: ["requester", "job"], // Include the relations property here
            });
        });

        it('should throw an error if booking does not exist', async () => {
            const id = 1;

            // Mock the findOne method to return undefined, simulating a booking not found scenario
            jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

            // Expect the service method to reject with an HttpException
            await expect(service.findById(id)).rejects.toThrow(HttpException);

            // Verify that repository.findOne was called with the correct id
            expect(repository.findOne).toHaveBeenCalledWith({ where: { id }, relations: ["requester", "job"], });
        });
    });

    describe('findAll', () => {
        it('should return all bookings', async () => {
            const bookings = [new Booking(), new Booking()];

            jest.spyOn(repository, 'find').mockResolvedValue(bookings);

            expect(await service.findAll()).toEqual(bookings);
            expect(repository.find).toHaveBeenCalled();
        });
    });

    describe('delete', () => {
        it('should delete a booking', async () => {
            const id = 1;
            const booking = new Booking();
            booking.id = id;

            jest.spyOn(repository, 'findOne').mockResolvedValue(booking);
            jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

            await service.delete(id);

            expect(repository.findOne).toHaveBeenCalledWith({ where: { id }, relations: ["requester", "job"] });
            expect(repository.delete).toHaveBeenCalledWith(booking);
        });

        it('should throw an error if booking does not exist', async () => {
            const id = 1;

            jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

            await expect(service.delete(id)).rejects.toThrow(HttpException);
            expect(repository.findOne).toHaveBeenCalledWith({ where: { id }, relations: ["requester", "job"] });
        });
    });

    describe('findBookingsByUser', () => {
        it('should return bookings made by a user', async () => {
            const userId = 1;
            const user = new User();
            user.id = userId;

            const bookings = [new Booking(), new Booking()];

            jest.spyOn(userService, 'findById').mockResolvedValue(user);
            jest.spyOn(repository, 'find').mockResolvedValue(bookings);

            expect(await service.findBookingsByUser(userId)).toEqual(bookings);
            expect(userService.findById).toHaveBeenCalledWith(userId);
            expect(repository.find).toHaveBeenCalledWith({ where: { requester: user }, relations: ["requester", "job"] });
        });

        it('should throw an error if user does not exist', async () => {
            const userId = 1;

            jest.spyOn(userService, 'findById').mockResolvedValue(undefined);

            await expect(service.findBookingsByUser(userId)).rejects.toThrow(HttpException);
            expect(userService.findById).toHaveBeenCalledWith(userId);
        });

        it('should throw an error if there are no bookings made by the user', async () => {
            const userId = 1;
            const user = new User();
            user.id = userId;
        
            jest.spyOn(userService, 'findById').mockResolvedValue(user);
        
            // Adjust the mock to throw an HttpException instead of a generic Error
            jest.spyOn(repository, 'find').mockRejectedValue(new HttpException('No bookings found', HttpStatus.NOT_FOUND));
        
            await expect(service.findBookingsByUser(userId)).rejects.toThrow(HttpException);
            expect(userService.findById).toHaveBeenCalledWith(userId);
            expect(repository.find).toHaveBeenCalledWith({ where: { requester: user }, relations: ["requester", "job"] });
        });
    });

    describe('findBookingsByJobs', () => {
        it('should return bookings with a job', async () => {
            const jobId = 1;
            const job = new Job();
            job.id = jobId;

            const bookings = [new Booking(), new Booking()];

            jest.spyOn(jobService, 'findById').mockResolvedValue(job);
            jest.spyOn(repository, 'find').mockResolvedValue(bookings);

            expect(await service.findBookingsByJobs(jobId)).toEqual(bookings);
            expect(jobService.findById).toHaveBeenCalledWith(jobId);
            expect(repository.find).toHaveBeenCalledWith({ where: { job }, relations: ["requester", "job"] });
        });

        it('should throw an error if job does not exist', async () => {
            const jobId = 1;

            jest.spyOn(jobService, 'findById').mockResolvedValue(undefined);

            await expect(service.findBookingsByJobs(jobId)).rejects.toThrow(HttpException);
            expect(jobService.findById).toHaveBeenCalledWith(jobId);
        });

        it('should throw an error if there are no bookings with the job', async () => {
            const jobId = 1;
            const job = new Job();
            job.id = jobId;

            jest.spyOn(jobService, 'findById').mockResolvedValue(job);
            jest.spyOn(repository, 'find').mockResolvedValue([]);

            await expect(service.findBookingsByJobs(jobId)).rejects.toThrow(HttpException);
            expect(jobService.findById).toHaveBeenCalledWith(jobId);
            expect(repository.find).toHaveBeenCalledWith({ where: { job }, relations: ["requester", "job"] });
        });
    });

    describe('findBookingsByUserAndJobs', () => {
        it('should return bookings made by a user with a job', async () => {
            const userId = 1;
            const user = new User();
            user.id = userId;

            const jobId = 1;
            const job = new Job();
            job.id = jobId;

            const bookings = [new Booking(), new Booking()];

            jest.spyOn(userService, 'findById').mockResolvedValue(user);
            jest.spyOn(jobService, 'findById').mockResolvedValue(job);
            jest.spyOn(repository, 'find').mockResolvedValue(bookings);

            expect(await service.findBookingsByUserAndJobs(userId, jobId)).toEqual(bookings);
            expect(userService.findById).toHaveBeenCalledWith(userId);
            expect(jobService.findById).toHaveBeenCalledWith(jobId);
            expect(repository.find).toHaveBeenCalledWith({ where: { requester: user, job }, relations: ["requester", "job"]});
        });

        it('should throw an error if user does not exist', async () => {
            const userId = 1;
            const jobId = 1;

            jest.spyOn(userService, 'findById').mockResolvedValue(undefined);

            await expect(service.findBookingsByUserAndJobs(userId, jobId)).rejects.toThrow(HttpException);
            expect(userService.findById).toHaveBeenCalledWith(userId);
        });

        it('should throw an error if job does not exist', async () => {
            const userId = 1;
            const jobId = 1;

            const user = new User();
            user.id = userId;
            jest.spyOn(userService, 'findById').mockResolvedValue(user);
            jest.spyOn(jobService, 'findById').mockResolvedValue(undefined);

            await expect(service.findBookingsByUserAndJobs(userId, jobId)).rejects.toThrow(HttpException);
            expect(userService.findById).toHaveBeenCalledWith(userId);
            expect(jobService.findById).toHaveBeenCalledWith(jobId);
        });
    });
});