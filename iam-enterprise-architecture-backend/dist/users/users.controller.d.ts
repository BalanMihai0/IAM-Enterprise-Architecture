import { Request } from 'express';
import { UsersService } from './users.service';
import { NewUserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(userDto: NewUserDto): Promise<import("../typeorm/entities/user").User>;
    findAll(): Promise<import("../typeorm/entities/user").User[]>;
    findById(id: number, req: Request): Promise<import("../typeorm/entities/user").User>;
    updateById(id: number, userDto: UpdateUserDto, req: Request): Promise<import("../typeorm/entities/user").User>;
    deleteById(id: number, req: Request): Promise<boolean>;
}
