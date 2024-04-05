import { NewUserDto } from './dto/user.dto';
import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    private readonly users: User[] = [{id: '1', email: 'admin@gmail.com', fullName: 'admin', password: bcrypt.hashSync('123456', 12), role: 'admin' }];

    async create(userDto: NewUserDto): Promise<User> {
        // user emails must be unique
        if (this.users.some(user => user.email === userDto.email)) {
            throw new HttpException('User with this email already exists', 400);
        }

        const hashedPassword = bcrypt.hashSync(userDto.password, 12);
        const user = {
            //for now id is uuid, later might switch to auto increment when db is connected
            id: uuidv4(),
            fullName: userDto.fullName,
            email: userDto.email,
            password: hashedPassword,
            role: 'customer'
        };
        //stores in memory for now
        await this.users.push(user);
        return user;
    }

    async findAll(): Promise<User[]> {
        return await this.users;
    }

    async findByEmail(email: string): Promise<User> {
        const foundUser = await this.users.find(user => user.email === email);
        if (!foundUser) throw new HttpException("User with this email does not exist", 404)

        return foundUser;
    }

    async findById(id: string): Promise<User> {
        const foundUser = await this.users.find(user => user.id === id);
        if (!foundUser) throw new HttpException("User with this email does not exist", 404)

        return foundUser;
    }
}
