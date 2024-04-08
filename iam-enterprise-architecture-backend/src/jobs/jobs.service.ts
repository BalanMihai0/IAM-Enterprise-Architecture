import { Injectable,HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'src/typeorm/entities/job';
import { Repository } from 'typeorm';
import { NewJobDTO } from './dto/job.dto';

@Injectable()
export class JobsService {
    constructor(
        @InjectRepository(Job) private readonly jobRepository: Repository<Job>
    ) { }

    async create(jobDto: NewJobDTO): Promise<Job> {
        const newJob = this.jobRepository.create({
            title: jobDto.title,
            description: jobDto.description,
            location: jobDto.location,
            price: jobDto.price,
            start_date: jobDto.startDate,
            end_date: jobDto.endDate,
            //posted_by will be taken from the token of the user
            posted_by: 69,
            posted_on: new Date()
        });

        return this.jobRepository.save(newJob);
    }

    async findById(id: number): Promise<Job>{
        const foundJob=await this.jobRepository.findOne({where: {id}});
        if (!foundJob) throw new HttpException("Job with this id does not exist", 404)
            return foundJob;
    }
}
