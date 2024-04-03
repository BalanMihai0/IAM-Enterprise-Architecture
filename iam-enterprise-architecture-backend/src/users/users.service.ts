import { NewUserDto } from './dto/user.dto';
import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    private readonly users: User[] = [];

    create(userDto: NewUserDto) {
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
        this.users.push(user);
        return user;
    }

    findAll() {
        return this.users;
    }

    findByEmail(email: string): User {
        const foundUser = this.users.find(user => user.email === email);
        if (!foundUser) throw new HttpException("User with this email does not exist", 404)

        return foundUser;
    }
}
