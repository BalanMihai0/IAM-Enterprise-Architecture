import { NewUserDto } from './dto/user.dto';
import { User } from '../typeorm/entities/user';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/updateUser.dto';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(userDto: NewUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User>;
    findById(id: number): Promise<User>;
    updateById(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    deleteById(id: number): Promise<boolean>;
}
