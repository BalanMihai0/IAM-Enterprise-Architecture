import { NewUserDto } from './dto/user.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../typeorm/entities/user';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { }

    async create(userDto: NewUserDto): Promise<User> {
        // user emails must be unique
        if (await this.userRepository.findOne({ where: { email: userDto.email } })) {
            throw new BadRequestException('User with this email already exists');
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
        if (!foundUser) throw new NotFoundException("User with this email does not exist")

        return foundUser;
    }

    async findById(id: number): Promise<User> {
        const foundUser = await this.userRepository.findOne({where: {id}});
        if (!foundUser) throw new NotFoundException("User with this id does not exist")

        return foundUser;
    }

    async updateById(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOne({where: {id}});

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const passwordMatch = bcrypt.compareSync(updateUserDto.password, user.password);
        if (!passwordMatch) throw new BadRequestException("The entered old password is incorrect");

        if (updateUserDto.newPassword === updateUserDto.confirmPassword) {
            const hashedPassword = bcrypt.hashSync(updateUserDto.newPassword, 12);
            user.password = hashedPassword;

            // Save the updated user entity to the database
            return this.userRepository.save(user);
        } else {
            throw new BadRequestException('New password and confirm password do not match');
        }
    }
}
