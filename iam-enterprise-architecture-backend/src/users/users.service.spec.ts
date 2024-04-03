import { UsersService } from './users.service';
import { NewUserDto } from './dto/user.dto';
import { HttpException } from '@nestjs/common';

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(() => {
    usersService = new UsersService();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const newUser: NewUserDto = {
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };
      
      const createdUser = await usersService.create(newUser);

      expect(createdUser).toBeDefined();
      expect(createdUser.id).toBeDefined();
      expect(createdUser.fullName).toBe(newUser.fullName);
      expect(createdUser.email).toBe(newUser.email);
      expect(createdUser.role).toBe('customer');
    });

    it('should throw HttpException when creating a user with an existing email', async () => {
      
      //Mocking an existing user
      const existingUser = {
        id: '123',
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
        role: 'customer'
      };
      usersService['users'].push(existingUser);

      //Mocking a new user
      const newUser: NewUserDto = {
        fullName: 'John Doe',
        email: 'jane@example.com',
        password: 'password123',
      };

      await expect(usersService.create(newUser)).rejects.toThrow(HttpException);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const allUsers = await usersService.findAll();
      expect(allUsers).toBeDefined();
      expect(Array.isArray(allUsers)).toBeTruthy();
    });
  });

  describe('findByEmail', () => {
    it('should find a user by email', async () => {
      // Mocking an existing user
      const existingUser = {
        id: '1',
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'customer'
      };
      usersService['users'].push(existingUser);

      const foundUser = await usersService.findByEmail('john@example.com');
      expect(foundUser).toBeDefined();
      expect(foundUser.email).toBe('john@example.com');
    });

    it('should throw HttpException when user is not found by email', async () => {
      await expect(usersService.findByEmail('nonexistent@example.com')).rejects.toThrow(HttpException);
    });
  });
});
