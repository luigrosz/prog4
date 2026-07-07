"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
class RegisterDto {
    username;
    password;
}
class LoginDto {
    username;
    password;
}
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    register(dto) {
        return this.authService.register(dto.username, dto.password);
    }
    login(dto) {
        return this.authService.login(dto.username, dto.password);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar usuário', description: 'Cria uma nova conta de usuário.' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                username: { type: 'string', example: 'admin' },
                password: { type: 'string', example: 'admin123' },
            },
            required: ['username', 'password'],
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Usuário registrado com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Usuário já existe.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Login', description: 'Autentica usuário e retorna token JWT.' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                username: { type: 'string', example: 'admin' },
                password: { type: 'string', example: 'admin123' },
            },
            required: ['username', 'password'],
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Login bem-sucedido.',
        schema: {
            type: 'object',
            properties: {
                access_token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIs...' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Credenciais inválidas.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Autenticação'),
    (0, common_1.Controller)('api/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map