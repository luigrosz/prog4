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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let Article = class Article {
    id;
    title;
    content;
    imageUrl;
    sortOrder;
    category;
    createdAt;
    updatedAt;
};
exports.Article = Article;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Identificador único' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Article.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Daria Morgendorffer',
        description: 'Título do conteúdo',
    }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Article.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Adolescente intelectual e sarcástica...',
        description: 'Corpo principal do artigo',
    }),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Article.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'img/daria.webp',
        description: 'Caminho ou URL da imagem associada',
        nullable: true,
    }),
    (0, typeorm_1.Column)({ name: 'image_url', type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", String)
], Article.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 10,
        description: 'Ordem de apresentação (prioridade de exibição)',
        default: 0,
    }),
    (0, typeorm_1.Column)({ name: 'sort_order', type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], Article.prototype, "sortOrder", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'personagens',
        description: 'Categoria do artigo para agrupamento',
    }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Article.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data de criação' }),
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Article.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data de última atualização' }),
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Article.prototype, "updatedAt", void 0);
exports.Article = Article = __decorate([
    (0, typeorm_1.Entity)('articles')
], Article);
//# sourceMappingURL=article.entity.js.map