import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';

class RegisterDto {
  username: string;
  password: string;
}

class LoginDto {
  username: string;
  password: string;
}

@ApiTags('Autenticação')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar usuário', description: 'Cria uma nova conta de usuário.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'admin' },
        password: { type: 'string', example: 'admin123' },
      },
      required: ['username', 'password'],
    },
  })
  @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso.' })
  @ApiResponse({ status: 409, description: 'Usuário já existe.' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.username, dto.password);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login', description: 'Autentica usuário e retorna token JWT.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'admin' },
        password: { type: 'string', example: 'admin123' },
      },
      required: ['username', 'password'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login bem-sucedido.',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIs...' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.username, dto.password);
  }
}
