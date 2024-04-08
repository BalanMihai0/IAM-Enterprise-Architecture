import { Controller, Body, Post, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { NewUserDto } from './dto/user.dto';
import { Roles } from '../auth/roles/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Users')
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
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.usersService.findAll();
    }

}

