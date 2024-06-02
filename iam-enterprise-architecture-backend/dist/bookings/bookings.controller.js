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
exports.BookingsController = void 0;
const common_1 = require("@nestjs/common");
const bookings_service_1 = require("./bookings.service");
const booking_dto_1 = require("./dto/booking.dto");
const roles_decorator_1 = require("../auth/roles/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const class_validator_1 = require("class-validator");
let BookingsController = class BookingsController {
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    async create(bookingDto, req) {
        const token = req.user;
        const errors = await (0, class_validator_1.validate)(bookingDto);
        if (errors.length > 0) {
            throw new common_1.BadRequestException(errors);
        }
        const requesterId = token.unique_name;
        return await this.bookingService.create(bookingDto, requesterId);
    }
    async delete(id, req) {
        return await this.bookingService.delete(id);
    }
    async findAll() {
        return await this.bookingService.findAll();
    }
    async findById(id, req) {
        const token = req.user;
        const booking = await this.bookingService.findById(id);
        if (token.unique_name != booking.requester.id && token.role != "admin") {
            throw new common_1.ForbiddenException("You are not authorized to access this resource.");
        }
        return booking;
    }
    async findBookingsByUser(id, req) {
        const token = req.user;
        if (token.unique_name != id && token.role != 'admin') {
            throw new common_1.ForbiddenException("You are not authorized to access this resource.");
        }
        return await this.bookingService.findBookingsByUser(id);
    }
    async findBookingsByJob(id, req) {
        const token = req.user;
        if (token.role != 'admin') {
            throw new common_1.ForbiddenException("You are not authorized to access this resource.");
        }
        return await this.bookingService.findBookingsByJobs(id);
    }
    async findBookingsByUserAndJobs(userId, jobId, req) {
        const token = req.user;
        if (token.unique_name != userId && token.role != 'admin') {
            throw new common_1.ForbiddenException('You are not authorized to access this resource.');
        }
        return await this.bookingService.findBookingsByUserAndJobs(userId, jobId);
    }
};
exports.BookingsController = BookingsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)("admin", "customer"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [booking_dto_1.NewBookingDTO, Object]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)("admin"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)("admin"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)("admin", "customer"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)('/user/:id'),
    (0, roles_decorator_1.Roles)("admin", "customer"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "findBookingsByUser", null);
__decorate([
    (0, common_1.Get)('/job/:id'),
    (0, roles_decorator_1.Roles)("admin"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "findBookingsByJob", null);
__decorate([
    (0, common_1.Get)('/user/:userId/job/:jobId'),
    (0, roles_decorator_1.Roles)('admin', 'customer'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('jobId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], BookingsController.prototype, "findBookingsByUserAndJobs", null);
exports.BookingsController = BookingsController = __decorate([
    (0, swagger_1.ApiTags)('Bookings'),
    (0, common_1.Controller)('bookings'),
    __metadata("design:paramtypes", [bookings_service_1.BookingService])
], BookingsController);
//# sourceMappingURL=bookings.controller.js.map