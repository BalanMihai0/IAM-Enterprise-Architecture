import { NewUserDto } from './dto/user.dto';
import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../typeorm/entities/user';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { }

    async create(userDto: NewUserDto): Promise<User> {
        // user emails must be unique
        if (await this.userRepository.findOne({ where: { email: userDto.email } })) {
            throw new HttpException('User with this email already exists', 400);
        }

        const hashedPassword = bcrypt.hashSync(userDto.password, 12);

        //create new user instance
        const newUser = this.userRepository.create({
            //id is generated automatically
            full_name: userDto.fullName,
            email: userDto.email,
            password: hashedPassword,
            role: 'customer'
        });

        //save to db
        console.log('newUser', newUser)
        return this.userRepository.save(newUser);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findByEmail(email: string): Promise<User> {
        const foundUser = await this.userRepository.findOne({where: {email}});
        if (!foundUser) throw new HttpException("User with this email does not exist", 404)

        return foundUser;
    }
}
