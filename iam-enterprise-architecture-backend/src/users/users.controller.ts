import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { NewUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async create(@Body() userDto: NewUserDto) {
        return await this.usersService.create(userDto);
    }

    //will be accessible only for administrators
    @Get()
    async findAll() {
        return await this.usersService.findAll();
    }

    @Get(':email')
    async findByEmail(@Param('email') email: string) {
        return await this.usersService.findByEmail(email);
    }
}

