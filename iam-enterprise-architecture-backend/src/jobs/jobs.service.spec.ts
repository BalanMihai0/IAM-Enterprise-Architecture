import { Test, TestingModule } from '@nestjs/testing';
import { JobsService } from './jobs.service';
import { Job } from '../typeorm/entities/job';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NewJobDTO } from './dto/job.dto';
import { HttpException } from '@nestjs/common';

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
          findOne: jest.fn(),
          find: jest.fn(),
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
      };

      const newJob: Job = {
        id: 1,
        title: newJobDto.title,
        description: newJobDto.description,
        location: newJobDto.location,
        price: newJobDto.price,
        posted_by: '69',
        posted_on: new Date(),
      };

      // Mock create and save methods of the repository
      (repository.create as jest.Mock).mockReturnValue(newJob);
      (repository.save as jest.Mock).mockResolvedValue(newJob);

      const createdJob = await service.create(newJobDto, '69');

      expect(createdJob).toEqual(newJob);

      // Ensure that create method was called with correct parameters
      expect(repository.create).toHaveBeenCalledWith({
        title: newJobDto.title,
        description: newJobDto.description,
        location: newJobDto.location,
        price: newJobDto.price,
        posted_by: '69',
        posted_on: expect.any(Date),
      });

      // Ensure that save method was called
      expect(repository.save).toHaveBeenCalledWith(newJob);
    });
  });

  describe('findById', () => {
    it('should return the job with the specified id', async () => {
      const jobId = 1;
      const mockJob: Job = {
        id: jobId,
        title: 'Software Engineer',
        description: 'Developing software applications',
        location: 'Remote',
        price: 5000,
        posted_by: '69',
        posted_on: new Date(),
      };

      // Mock findOne method of the repository
      (repository.findOne as jest.Mock).mockResolvedValue(mockJob);

      const foundJob = await service.findById(jobId);

      expect(foundJob).toEqual(mockJob);

      // Ensure that findOne method was called with correct parameters
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: jobId } });
    });

    it('should throw HttpException when job is not found by id', async () => {
      const jobId = 1;

      // Mock findOne method of the repository to return null (indicating job not found)
      (repository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.findById(jobId)).rejects.toThrow(HttpException);

      // Ensure that findOne method was called with correct parameters
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: jobId } });
    });
  });
});