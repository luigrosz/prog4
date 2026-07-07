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
exports.CreateArticleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateArticleDto {
    title;
    content;
    imageUrl;
    sortOrder;
    category;
}
exports.CreateArticleDto = CreateArticleDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Daria Morgendorffer',
        description: 'Título do conteúdo',
    }),
    __metadata("design:type", String)
], CreateArticleDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Adolescente intelectual e sarcástica...',
        description: 'Corpo principal do artigo',
    }),
    __metadata("design:type", String)
], CreateArticleDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'img/daria.webp',
        description: 'Caminho ou URL da imagem associada',
    }),
    __metadata("design:type", String)
], CreateArticleDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 10,
        description: 'Ordem de apresentação (prioridade de exibição)',
        default: 0,
    }),
    __metadata("design:type", Number)
], CreateArticleDto.prototype, "sortOrder", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'personagens',
        description: 'Categoria do artigo para agrupamento',
    }),
    __metadata("design:type", String)
], CreateArticleDto.prototype, "category", void 0);
//# sourceMappingURL=create-article.dto.js.map