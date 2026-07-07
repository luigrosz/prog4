import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import {
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let authService: AuthService;

  const mockUser = {
    id: 1,
    username: 'admin',
    password: '$2b$10$hashedPassword',
    createdAt: new Date(),
  };

  const mockUsersService = {
    findByUsername: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mock-jwt-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('deve registrar novo usuário com senha hasheada', async () => {
      mockUsersService.findByUsername.mockResolvedValue(null);
      mockUsersService.create.mockResolvedValue({
        id: 1,
        username: 'admin',
        createdAt: new Date(),
      });

      const result = await authService.register('admin', 'admin123');
      expect(result.username).toBe('admin');
      expect(result.id).toBe(1);
      expect(mockUsersService.create).toHaveBeenCalled();
      // verify password was hashed (not plaintext)
      const createCall = mockUsersService.create.mock.calls[0];
      expect(createCall[1]).not.toBe('admin123');
    });

    it('deve lançar ConflictException se usuário já existe', async () => {
      mockUsersService.findByUsername.mockResolvedValue(mockUser);

      await expect(
        authService.register('admin', 'admin123'),
      ).rejects.toThrow(ConflictException);
      expect(mockUsersService.create).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('deve retornar access_token com credenciais válidas', async () => {
      const hashedPw = await bcrypt.hash('admin123', 10);
      mockUsersService.findByUsername.mockResolvedValue({
        ...mockUser,
        password: hashedPw,
      });

      const result = await authService.login('admin', 'admin123');
      expect(result).toHaveProperty('access_token');
      expect(result.access_token).toBe('mock-jwt-token');
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        sub: 1,
        username: 'admin',
      });
    });

    it('deve lançar UnauthorizedException com senha incorreta', async () => {
      const hashedPw = await bcrypt.hash('admin123', 10);
      mockUsersService.findByUsername.mockResolvedValue({
        ...mockUser,
        password: hashedPw,
      });

      await expect(
        authService.login('admin', 'wrongpass'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('deve lançar UnauthorizedException se usuário não existe', async () => {
      mockUsersService.findByUsername.mockResolvedValue(null);

      await expect(
        authService.login('nonexistent', 'pass'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
