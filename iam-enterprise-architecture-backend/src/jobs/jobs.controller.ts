import { Body, Controller, Post, Get, Patch, Delete, Param, Req, UseGuards, ForbiddenException, BadRequestException } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { NewJobDTO } from './dto/job.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { UpdateJobDto } from './dto/updateJob.dto';
import { ValidationError, validate } from 'class-validator';

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService : JobsService) { }

    @Post()
    @Roles("admin")
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async create(@Req() req: Request, @Body() jobDto: NewJobDTO) {

        const token: any = req.user;

        return await this.jobsService.create(jobDto, token.id);
    }

    @Get()
    @Roles("*")
    async findAll() {
        return await this.jobsService.findAll();
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