import { JobsService } from './jobs.service';
import { NewJobDTO } from './dto/job.dto';
import { Request } from 'express';
import { UpdateJobDto } from './dto/updateJob.dto';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    create(req: Request, jobDto: NewJobDTO): Promise<import("../typeorm/entities/job").Job>;
    findAll(): Promise<import("../typeorm/entities/job").Job[]>;
    findById(id: number, req: Request): Promise<import("../typeorm/entities/job").Job>;
    updateById(id: number, jobDto: UpdateJobDto, req: Request): Promise<import("../typeorm/entities/job").Job>;
    deleteById(id: number): Promise<boolean>;
}
