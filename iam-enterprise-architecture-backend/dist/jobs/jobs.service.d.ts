import { Job } from '../typeorm/entities/job';
import { Repository } from 'typeorm';
import { NewJobDTO } from './dto/job.dto';
import { UpdateJobDto } from './dto/updateJob.dto';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
export declare class JobsService {
    private readonly jobRepository;
    constructor(jobRepository: Repository<Job>);
    create(jobDto: NewJobDTO, id: string): Promise<Job>;
    findAll(title?: string, startDate?: string, endDate?: string, options?: IPaginationOptions): Promise<Pagination<Job>>;
    findById(id: number): Promise<Job>;
    updateById(id: number, updateJobDto: UpdateJobDto): Promise<Job>;
    deleteById(id: number): Promise<boolean>;
}
