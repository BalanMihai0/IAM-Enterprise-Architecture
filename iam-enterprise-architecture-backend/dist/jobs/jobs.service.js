"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const job_1 = require("../typeorm/entities/job");
const typeorm_2 = require("typeorm");
let JobsService = class JobsService {
    constructor(jobRepository) {
        this.jobRepository = jobRepository;
    }
    async create(jobDto, id) {
        const postedById = id;
        const newJob = this.jobRepository.create({
            title: jobDto.title,
            description: jobDto.description,
            location: jobDto.location,
            price: jobDto.price,
            posted_by: postedById,
            posted_on: new Date()
        });
        return this.jobRepository.save(newJob);
    }
    async findAll() {
        const foundJobs = await this.jobRepository.find();
        return foundJobs;
    }
    async findById(id) {
        const foundJob = await this.jobRepository.findOne({ where: { id } });
        if (!foundJob)
            throw new common_1.HttpException("Job with this id does not exist", 404);
        return foundJob;
    }
    async updateById(id, updateJobDto) {
        const job = await this.jobRepository.findOne({ where: { id } });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        job.description = updateJobDto.description ?? job.description;
        job.price = updateJobDto.price ?? job.price;
        return this.jobRepository.save(job);
    }
    async deleteById(id) {
        const job = await this.jobRepository.findOne({ where: { id } });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        const deletionResult = await this.jobRepository.delete(id);
        if (deletionResult && deletionResult.affected && deletionResult.affected > 0) {
            return true;
        }
        else {
            return false;
        }
    }
};
exports.JobsService = JobsService;
exports.JobsService = JobsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_1.Job)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], JobsService);
//# sourceMappingURL=jobs.service.js.map