import { Body, Controller, Post, Get, Query, Patch, Delete, Param, Req, UseGuards, ForbiddenException, BadRequestException } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { NewJobDTO } from './dto/job.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { UpdateJobDto } from './dto/updateJob.dto';
import { ValidationError, validate } from 'class-validator';
import { Job } from 'src/typeorm/entities/job';
import { Pagination } from 'nestjs-typeorm-paginate';

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) { }

    @Post()
    @Roles("admin")
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async create(@Req() req: Request, @Body() jobDto: NewJobDTO) {
        const token: any = req.user;
        return await this.jobsService.create(jobDto, token.unique_name);
    }

    @Get()
    @Roles("*")
    @ApiQuery({ name: 'title', required: false })
    @ApiQuery({ name: 'startDate', required: false })
    @ApiQuery({ name: 'endDate', required: false })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    async findAll(
        @Query('title') title?: string,
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<Pagination<Job>> {
        return await this.jobsService.findAll(title, startDate, endDate, { page, limit });
    }


    @Get(':id')
    @Roles("*")
    async findById(@Param('id') id: number, @Req() req: Request) {
        return await this.jobsService.findById(id);
    }

    @Patch(':id')
    @Roles("admin")
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async updateById(@Param('id') id: number, @Body() jobDto: UpdateJobDto, @Req() req: Request) {
        const token: any = req.user;

        if (token.id != id && token.role != "admin") {
            throw new ForbiddenException("You are not authorized to update this resource.");
        }

        const errors = await validate(jobDto);
        if (errors.length > 0) {
            throw new BadRequestException(errors);
        }

        return await this.jobsService.updateById(id, jobDto);
    }

    @Delete(":id")
    @Roles("admin")
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async deleteById(@Param('id') id: number) {
        return await this.jobsService.deleteById(id);
    }
}