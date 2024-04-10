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
                }
            }, {
                provide: UsersService,
                useValue: {
                    findById: jest.fn()
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
                    findById: jest.fn()
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
        it('should create a new booking', async () => {
            const bookingDto: NewBookingDTO = {
                requester: 1, // Assuming userId
                job: 1, // Assuming jobId
            };

            const currentDate = new Date();
            const mockDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);


            // Mock the behavior of findById methods of UserService and JobService
            jest.spyOn(userService, 'findById').mockResolvedValueOnce({
                id: 1,
                email: '',
                password: '',
                full_name: '',
                role: '',
            }); // Mock user found
            jest.spyOn(jobService, 'findById').mockResolvedValueOnce({
                id: 1,
                title: '',
                description: '',
                location: '',
                price: 0,
                start_date: mockDate,
                end_date: mockDate,
                posted_by: 1,
                posted_on: new Date(),
            }); // Mock job found

            // Mock the behavior of bookingRepository methods
            jest.spyOn(repository, 'create').mockImplementationOnce(() => ({
                id: 1,
                requester: {
                    id: 1,
                    email: '',
                    password: '',
                    full_name: '',
                    role: '',
                },
                job: {
                    id: 1,
                    title: '',
                    description: '',
                    location: '',
                    price: 0,
                    start_date: mockDate,
                    end_date: mockDate,
                    posted_by: 1,
                    posted_on: new Date(),
                },
            }));

            jest.spyOn(repository, 'save').mockResolvedValueOnce({
                id: 1,
                requester: {
                    id: 1,
                    email: '',
                    password: '',
                    full_name: '',
                    role: '',
                },
                job: {
                    id: 1,
                    title: '',
                    description: '',
                    location: '',
                    price: 0,
                    start_date: mockDate,
                    end_date: mockDate,
                    posted_by: 1,
                    posted_on: new Date(),
                },
            });

            // Call create method of BookingService
            const result = await service.create(bookingDto);

            // Check if the result is as expected
            expect(result).toBeDefined();
            // You can add more expectations here based on your implementation
        });
    });
});