import { Test, TestingModule } from '@nestjs/testing';
import { JobsService } from './jobs.service';
import { Job } from '../typeorm/entities/job';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NewJobDTO } from './dto/job.dto';

describe('JobsService', () => {
  let service: JobsService;
  let repository: Repository<Job>;
  const JOB_REPOSITORY_TOKEN = getRepositoryToken(Job);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobsService, {
        provide: JOB_REPOSITORY_TOKEN,
        useValue: {
          create: jest.fn(),
          save: jest.fn(),
        }
      }],
    }).compile();

    service = module.get<JobsService>(JobsService);
    repository = module.get<Repository<Job>>(JOB_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('job repository should be defined', () => {
    expect(repository).toBeDefined();
  });
  describe('create', () => {
    it('should create a new job', async () => {
      const newJobDto: NewJobDTO = {
        title: 'Software Engineer',
        description: 'Developing software applications',
        location: 'Remote',
        price: 5000,
        startDate: new Date('2024-04-10'),
        endDate: new Date('2024-04-15'),
      };

      const newJob: Job = {
        id: 1,
        title: newJobDto.title,
        description: newJobDto.description,
        location: newJobDto.location,
        price: newJobDto.price,
        start_date: newJobDto.startDate,
        end_date: newJobDto.endDate,
        posted_by: 69,
        posted_on: new Date(),
      };

      // Mock create and save methods of the repository
      (repository.create as jest.Mock).mockReturnValue(newJob);
      (repository.save as jest.Mock).mockResolvedValue(newJob);

      const createdJob = await service.create(newJobDto);

      expect(createdJob).toEqual(newJob);

      // Ensure that create method was called with correct parameters
      expect(repository.create).toHaveBeenCalledWith({
        title: newJobDto.title,
        description: newJobDto.description,
        location: newJobDto.location,
        price: newJobDto.price,
        start_date: newJobDto.startDate,
        end_date: newJobDto.endDate,
        posted_by: 69,
        posted_on: expect.any(Date),
      });

      // Ensure that save method was called
      expect(repository.save).toHaveBeenCalledWith(newJob);
    });
  });
});
