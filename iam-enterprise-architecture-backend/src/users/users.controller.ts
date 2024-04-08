import { Controller, Body, Post, Get, Param, UseGuards, Req, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';
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
    async create(@Body() userDto: NewUserDto) {
        return await this.usersService.create(userDto);
    }

    @Get()
    @Roles("admin")
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async findAll() {
        return await this.usersService.findAll();
    }

    @Get(':id')
    @Roles("admin", "customer")
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    async findById(@Param('id') id: number, @Req() req: Request) {
        const token : any = req.user;

        if (token.id != id) {
            // If user ID from token does not match the requested ID, return an error
            throw new ForbiddenException("You are not authorized to access this resource.");
        }
        return await this.usersService.findById(id);
    }

}

