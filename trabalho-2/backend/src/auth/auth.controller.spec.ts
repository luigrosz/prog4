import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    it('deve registrar novo usuário', async () => {
      mockAuthService.register.mockResolvedValue({
        id: 2,
        username: 'novo_user',
      });

      const result = await controller.register({
        username: 'novo_user',
        password: 'senha123',
      });
      expect(result.username).toBe('novo_user');
      expect(mockAuthService.register).toHaveBeenCalledWith(
        'novo_user',
        'senha123',
      );
    });

    it('deve propagar ConflictException', async () => {
      mockAuthService.register.mockRejectedValue(
        new ConflictException('Usuário já existe'),
      );

      await expect(
        controller.register({ username: 'admin', password: 'x' }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('POST /api/auth/login', () => {
    it('deve retornar token JWT', async () => {
      mockAuthService.login.mockResolvedValue({
        access_token: 'jwt-token-here',
      });

      const result = await controller.login({
        username: 'admin',
        password: 'admin123',
      });
      expect(result.access_token).toBe('jwt-token-here');
      expect(mockAuthService.login).toHaveBeenCalledWith('admin', 'admin123');
    });

    it('deve propagar UnauthorizedException', async () => {
      mockAuthService.login.mockRejectedValue(
        new UnauthorizedException('Credenciais inválidas'),
      );

      await expect(
        controller.login({ username: 'admin', password: 'errada' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
