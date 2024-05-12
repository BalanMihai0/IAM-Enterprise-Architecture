import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: { sign: jest.fn() } },
        { provide: UsersService, useValue: { findByEmail: jest.fn() } },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('validateUser', () => {
    it('should return a JWT token if user exists and password is correct', async () => {
      //mock an existing user
      const user = {
        id: 1,
        full_name: 'Example User',
        email: 'test@example.com',
        password: bcrypt.hashSync('password', 12),
        role: 'customer'
      };

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);
      jest.spyOn(jwtService, 'sign').mockReturnValue('token');

      const result = await authService.validateUser({ email: 'test@example.com', password: 'password' });
      expect(result).toBe('token');
    });

    it('should return null if user exists but password is incorrect', async () => {
      //mock an existing user
      const user = {
        id: 1,
        full_name: 'Example User',
        email: 'test@example.com',
        password: bcrypt.hashSync('password', 12),
        role: 'customer'
      };
      
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false);

      const result = await authService.validateUser({ email: 'test@example.com', password: 'wrongpassword' });
      expect(result).toBeNull();
    });

    it('should return null if user does not exist', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);

      const result = await authService.validateUser({ email: 'test@example.com', password: 'password' });
      expect(result).toBeNull();
    });
  });

});
