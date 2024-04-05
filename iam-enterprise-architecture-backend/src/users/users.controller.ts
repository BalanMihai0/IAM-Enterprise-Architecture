import { Controller, Body, Post, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { NewUserDto } from './dto/user.dto';
import { Roles } from '../auth/roles/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/roles/roles.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @Roles("*")
    create(@Body() userDto: NewUserDto) {
        return this.usersService.create(userDto);
    }

    @Get()
    @Roles("admin")
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.usersService.findAll();
    }

}

