import { JobsService } from './jobs.service';
import { NewJobDTO } from './dto/job.dto';
import { Request } from 'express';
import { UpdateJobDto } from './dto/updateJob.dto';
import { Job } from 'src/typeorm/entities/job';
import { Pagination } from 'nestjs-typeorm-paginate';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    create(req: Request, jobDto: NewJobDTO): Promise<Job>;
    findAll(title?: string, startDate?: string, endDate?: string, page?: number, limit?: number): Promise<Pagination<Job>>;
    findById(id: number, req: Request): Promise<Job>;
    updateById(id: number, jobDto: UpdateJobDto, req: Request): Promise<Job>;
    deleteById(id: number): Promise<boolean>;
}
