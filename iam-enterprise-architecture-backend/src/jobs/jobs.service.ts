import { Injectable, HttpException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from '../typeorm/entities/job';
import { DeleteResult, Repository, Timestamp } from 'typeorm';
import { NewJobDTO } from './dto/job.dto';
import { UpdateJobDto } from './dto/updateJob.dto';

@Injectable()
export class JobsService {
    constructor(
        @InjectRepository(Job) private readonly jobRepository: Repository<Job>
    ) { }

    async create(jobDto: NewJobDTO, id: number): Promise<Job> {
        const postedById: number = typeof id === 'string' ? parseInt(id) : id;

        const newJob: Job = this.jobRepository.create({
            title: jobDto.title,
            description: jobDto.description,
            location: jobDto.location,
            price: jobDto.price,
            start_date: new Date(jobDto.startDate),
            end_date: new Date(jobDto.endDate),
            posted_by: postedById,
            posted_on: new Date()
        });

        return this.jobRepository.save(newJob);
    }

    async findAll(): Promise<Job[]> {
        const foundJobs = await this.jobRepository.find();
        return foundJobs;
    }

    async findById(id: number): Promise<Job> {
        const foundJob = await this.jobRepository.findOne({ where: { id } });
        if (!foundJob) throw new HttpException("Job with this id does not exist", 404)
        return foundJob;
    }

    async updateById(id: number, updateJobDto: UpdateJobDto): Promise<Job> {
        const job = await this.jobRepository.findOne({ where: { id } });

        if (!job) {
            throw new NotFoundException('Job not found');
        }

        // Update fields only if they are not null or undefined. In this case only specified in request fields will get updated
        job.description = updateJobDto.description ?? job.description;
        job.price = updateJobDto.price ?? job.price;

        return this.jobRepository.save(job);
    }


    async deleteById(id: number): Promise<boolean> {
        const job = await this.jobRepository.findOne({ where: { id } });

        if (!job) {
            throw new NotFoundException('Job not found');
        }

        const deletionResult: DeleteResult = await this.jobRepository.delete(id);

        if (deletionResult && deletionResult.affected && deletionResult.affected > 0) {
            return true;
        } else {
            return false;
        }
    }
}
