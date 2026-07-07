import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string) {
    const existing = await this.usersService.findByUsername(username);
    if (existing) {
      throw new ConflictException('Usuário já existe');
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await this.usersService.create(username, hash);
    return { id: user.id, username: user.username };
  }

  async login(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
