import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  UseGuards,
  Req,
  ForbiddenException,
  BadRequestException,
  Patch,
  Delete,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { NewUserDto } from './dto/user.dto';
import { Roles } from '../auth/roles/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { validate } from 'class-validator';
import { UpdateUserDto } from './dto/updateUser.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles('*')
  async create(@Body() userDto: NewUserDto) {
    const errors = await validate(userDto);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    if (userDto.confirmPassword !== userDto.password) {
      throw new BadRequestException('Passwords must match!');
    }

    return await this.usersService.create(userDto);
  }

  @Get()
  @Roles('admin')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'customer')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: number, @Req() req: Request) {
    const token: any = req.user;

    if (token.id != id && token.role != 'admin') {
      throw new ForbiddenException(
        'You are not authorized to access this resource.',
      );
    }
    return await this.usersService.findById(id);
  }

  @Patch(':id')
  @Roles('customer')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateById(
    @Param('id') id: number,
    @Body() userDto: UpdateUserDto,
    @Req() req: Request,
  ) {
    const token: any = req.user;

    if (token.id != id && token.role != 'admin') {
      throw new ForbiddenException(
        'You are not authorized to update this resource.',
      );
    }

    const errors = await validate(userDto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return await this.usersService.updateById(id, userDto);
  }

  @Delete(':id')
  @Roles('admin', 'customer')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async deleteById(@Param('id') id: number, @Req() req: Request) {
    const token: any = req.user;

    if (token.id !== id && token.role != 'admin') {
      throw new ForbiddenException(
        'You are not authorized to update this resource.',
      );
    }

    return await this.usersService.deleteById(id);
  }
}
