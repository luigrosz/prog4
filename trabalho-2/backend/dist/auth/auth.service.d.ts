import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(username: string, password: string): Promise<{
        id: number;
        username: string;
    }>;
    login(username: string, password: string): Promise<{
        access_token: string;
    }>;
}
