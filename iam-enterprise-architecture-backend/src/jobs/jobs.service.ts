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

    async create(jobDto: NewJobDTO, id: string): Promise<Job> {
        const postedById: string = id;

        const newJob: Job = this.jobRepository.create({
            title: jobDto.title,
            description: jobDto.description,
            location: jobDto.location,
            price: jobDto.price,
            posted_by: postedById,
            posted_on: new Date()
        });

        return this.jobRepository.save(newJob);
    }

    async findAll(title?: string, startDate?: string, endDate?: string): Promise<Job[]> {
        const query = this.jobRepository.createQueryBuilder('job');

        if (title) {
            query.andWhere('job.title LIKE :title', { title: `%${title}%` });
        }

        if (startDate) {
            query.andWhere('job.posted_on >= :startDate', { startDate });
        }

        if (endDate) {
            query.andWhere('job.posted_on <= :endDate', { endDate });
        }

        const foundJobs = await query.getMany();
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
