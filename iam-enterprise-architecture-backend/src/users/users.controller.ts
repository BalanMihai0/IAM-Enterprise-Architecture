import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { NewUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    create(@Body() userDto: NewUserDto) {
        return this.usersService.create(userDto);
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }
}

