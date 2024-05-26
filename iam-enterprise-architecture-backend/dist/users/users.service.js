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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const user_1 = require("../typeorm/entities/user");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(userDto) {
        if (await this.userRepository.findOne({ where: { email: userDto.email } })) {
            throw new common_1.BadRequestException('User with this email already exists');
        }
        const hashedPassword = bcrypt.hashSync(userDto.password, 12);
        const newUser = this.userRepository.create({
            full_name: userDto.fullName,
            email: userDto.email,
            password: hashedPassword,
            role: 'customer'
        });
        console.log('newUser', newUser);
        return this.userRepository.save(newUser);
    }
    async findAll() {
        return await this.userRepository.find();
    }
    async findByEmail(email) {
        const foundUser = await this.userRepository.findOne({ where: { email } });
        if (!foundUser)
            throw new common_1.NotFoundException("User with this email does not exist");
        return foundUser;
    }
    async findById(id) {
        const foundUser = await this.userRepository.findOne({ where: { id } });
        if (!foundUser)
            throw new common_1.NotFoundException("User with this id does not exist");
        return foundUser;
    }
    async updateById(id, updateUserDto) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const passwordMatch = bcrypt.compareSync(updateUserDto.password, user.password);
        if (!passwordMatch)
            throw new common_1.BadRequestException("The entered old password is incorrect");
        if (updateUserDto.newPassword === updateUserDto.confirmPassword) {
            const hashedPassword = bcrypt.hashSync(updateUserDto.newPassword, 12);
            user.password = hashedPassword;
            return this.userRepository.save(user);
        }
        else {
            throw new common_1.BadRequestException('New password and confirm password do not match');
        }
    }
    async deleteById(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const deletionResult = await this.userRepository.delete(id);
        if (deletionResult && deletionResult.affected && deletionResult.affected > 0) {
            return true;
        }
        else {
            return false;
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map