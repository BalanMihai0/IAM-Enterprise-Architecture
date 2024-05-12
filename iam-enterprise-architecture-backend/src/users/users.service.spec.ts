import { UsersService } from './users.service';
import { NewUserDto } from './dto/user.dto';
import { HttpException } from '@nestjs/common';
import { User } from '../typeorm/entities/user';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;
  const USER_REPOSITORY_TOKEN = getRepositoryToken(User);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {
        provide: USER_REPOSITORY_TOKEN,
        useValue: {
          create: jest.fn(),
          save: jest.fn(),
          findOne: jest.fn(),
          find: jest.fn(),
        }
      }],
    }).compile();
  
    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('user repository should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      // Mock findOne to return null (indicating that user with this email doesn't exist)
      (repository.findOne as jest.Mock).mockResolvedValue(null);

      // Mock the bcrypt hashSync function
      jest.spyOn(bcrypt, 'hashSync').mockReturnValue('hashedPassword');

      // Mock save method of the repository
      (repository.create as jest.Mock).mockReturnValue({
        id: '123',
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'hashedPassword',
        role: 'customer',
      });
      (repository.save as jest.Mock).mockResolvedValue({
        id: '123',
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'hashedPassword',
        role: 'customer',
      });

      const newUser: NewUserDto = {
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password'
      };

      const createdUser = await service.create(newUser);

      expect(createdUser).toEqual({
        id: '123',
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'hashedPassword',
        role: 'customer',
      });

      // Ensure that repository methods were called with correct parameters
      expect(repository.findOne).toHaveBeenCalledWith({ where: { email: newUser.email } });
      expect(repository.create).toHaveBeenCalledWith({
        full_name: newUser.fullName,
        email: newUser.email,
        password: 'hashedPassword',
        role: 'customer',
      });
      expect(repository.save).toHaveBeenCalledWith({
        id: '123',
        fullName: newUser.fullName,
        email: newUser.email,
        password: 'hashedPassword',
        role: 'customer',
      });
    });

    it('should throw HttpException when creating a user with an existing email', async () => {
      // Mock findOne to return a user (indicating that user with this email already exists)
      (repository.findOne as jest.Mock).mockResolvedValue({
        id: '123',
        fullName: 'Jane Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'customer',
      });

      const newUser: NewUserDto = {
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        confirmPassword: 'password'
      };

      await expect(service.create(newUser)).rejects.toThrow(HttpException);

      // Ensure that findOne was called with correct parameters
      expect(repository.findOne).toHaveBeenCalledWith({ where: { email: newUser.email } });
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const mockUsers: User[] = [
        { id: 1, full_name: 'John Doe', email: 'john@example.com', password: 'password123', role: 'customer' },
        { id: 2, full_name: 'Jane Doe', email: 'jane@example.com', password: 'password123', role: 'customer' },
      ];

      // Mock find method of the repository
      (repository.find as jest.Mock).mockResolvedValue(mockUsers);

      const allUsers = await service.findAll();
      
      expect(allUsers).toEqual(mockUsers);

      // Ensure that find method was called
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findByEmail', () => {
    it('should find a user by email', async () => {
      const mockUser: User = { id: 1, full_name: 'John Doe', email: 'john@example.com', password: 'password123', role: 'customer' };

      // Mock findOne method of the repository
      (repository.findOne as jest.Mock).mockResolvedValue(mockUser);

      const foundUser = await service.findByEmail('john@example.com');
      
      expect(foundUser).toEqual(mockUser);

      // Ensure that findOne method was called with correct parameters
      expect(repository.findOne).toHaveBeenCalledWith({ where: { email: 'john@example.com' } });
    });

    it('should throw HttpException when user is not found by email', async () => {
      // Mock findOne method of the repository to return null (indicating user not found)
      (repository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.findByEmail('nonexistent@example.com')).rejects.toThrow(HttpException);

      // Ensure that findOne method was called with correct parameters
      expect(repository.findOne).toHaveBeenCalledWith({ where: { email: 'nonexistent@example.com' } });
    });
  });
});