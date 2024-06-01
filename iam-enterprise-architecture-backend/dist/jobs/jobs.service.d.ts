import { Job } from '../typeorm/entities/job';
import { Repository } from 'typeorm';
import { NewJobDTO } from './dto/job.dto';
import { UpdateJobDto } from './dto/updateJob.dto';
export declare class JobsService {
    private readonly jobRepository;
    constructor(jobRepository: Repository<Job>);
    create(jobDto: NewJobDTO, id: string): Promise<Job>;
    findAll(): Promise<Job[]>;
    findById(id: number): Promise<Job>;
    updateById(id: number, updateJobDto: UpdateJobDto): Promise<Job>;
    deleteById(id: number): Promise<boolean>;
}
