import { Body, Controller, Post } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { NewJobDTO } from './dto/job.dto';

@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService : JobsService) { }

    @Post()
    async create(@Body() jobDto: NewJobDTO) {
        return await this.jobsService.create(jobDto);
    }
}