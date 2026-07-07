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
exports.ArticlesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const articles_service_1 = require("./articles.service");
const create_article_dto_1 = require("./dto/create-article.dto");
const update_article_dto_1 = require("./dto/update-article.dto");
const article_entity_1 = require("./entities/article.entity");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let ArticlesController = class ArticlesController {
    articlesService;
    constructor(articlesService) {
        this.articlesService = articlesService;
    }
    findAll(category) {
        return this.articlesService.findAll(category);
    }
    findOne(id) {
        return this.articlesService.findOne(id);
    }
    create(dto) {
        return this.articlesService.create(dto);
    }
    update(id, dto) {
        return this.articlesService.update(id, dto);
    }
    remove(id) {
        return this.articlesService.remove(id);
    }
};
exports.ArticlesController = ArticlesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar artigos',
        description: 'Retorna todos os artigos ordenados por sortOrder ASC.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'category',
        required: false,
        description: 'Filtrar por categoria (ex: personagens, temporadas, frases)',
        example: 'personagens',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de artigos retornada com sucesso.',
        type: [article_entity_1.Article],
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Não autenticado.' }),
    __param(0, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obter artigo por ID',
        description: 'Retorna um artigo específico pelo seu identificador.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do artigo', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Artigo encontrado.',
        type: article_entity_1.Article,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Não autenticado.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Artigo não encontrado.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Criar artigo',
        description: 'Cria um novo artigo na wiki.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Artigo criado com sucesso.',
        type: article_entity_1.Article,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Não autenticado.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_article_dto_1.CreateArticleDto]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Atualizar artigo',
        description: 'Atualiza um artigo existente. Campos não enviados são preservados.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do artigo', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Artigo atualizado com sucesso.',
        type: article_entity_1.Article,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Não autenticado.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Artigo não encontrado.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_article_dto_1.UpdateArticleDto]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Remover artigo',
        description: 'Remove permanentemente um artigo da wiki.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do artigo', example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Artigo removido com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Não autenticado.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Artigo não encontrado.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ArticlesController.prototype, "remove", null);
exports.ArticlesController = ArticlesController = __decorate([
    (0, swagger_1.ApiTags)('Artigos'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('api/articles'),
    __metadata("design:paramtypes", [articles_service_1.ArticlesService])
], ArticlesController);
//# sourceMappingURL=articles.controller.js.map