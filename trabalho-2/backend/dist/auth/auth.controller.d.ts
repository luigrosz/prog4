import { AuthService } from './auth.service';
declare class RegisterDto {
    username: string;
    password: string;
}
declare class LoginDto {
    username: string;
    password: string;
}
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        id: number;
        username: string;
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
}
export {};
