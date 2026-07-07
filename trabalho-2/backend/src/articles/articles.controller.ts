import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Artigos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar artigos',
    description: 'Retorna todos os artigos ordenados por sortOrder ASC.',
  })
  @ApiQuery({
    name: 'category',
    required: false,
    description: 'Filtrar por categoria (ex: personagens, temporadas, frases)',
    example: 'personagens',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de artigos retornada com sucesso.',
    type: [Article],
  })
  @ApiResponse({ status: 401, description: 'Não autenticado.' })
  findAll(@Query('category') category?: string) {
    return this.articlesService.findAll(category);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obter artigo por ID',
    description: 'Retorna um artigo específico pelo seu identificador.',
  })
  @ApiParam({ name: 'id', description: 'ID do artigo', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Artigo encontrado.',
    type: Article,
  })
  @ApiResponse({ status: 401, description: 'Não autenticado.' })
  @ApiResponse({ status: 404, description: 'Artigo não encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Criar artigo',
    description: 'Cria um novo artigo na wiki.',
  })
  @ApiResponse({
    status: 201,
    description: 'Artigo criado com sucesso.',
    type: Article,
  })
  @ApiResponse({ status: 401, description: 'Não autenticado.' })
  create(@Body() dto: CreateArticleDto) {
    return this.articlesService.create(dto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualizar artigo',
    description:
      'Atualiza um artigo existente. Campos não enviados são preservados.',
  })
  @ApiParam({ name: 'id', description: 'ID do artigo', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Artigo atualizado com sucesso.',
    type: Article,
  })
  @ApiResponse({ status: 401, description: 'Não autenticado.' })
  @ApiResponse({ status: 404, description: 'Artigo não encontrado.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateArticleDto,
  ) {
    return this.articlesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remover artigo',
    description: 'Remove permanentemente um artigo da wiki.',
  })
  @ApiParam({ name: 'id', description: 'ID do artigo', example: 1 })
  @ApiResponse({ status: 200, description: 'Artigo removido com sucesso.' })
  @ApiResponse({ status: 401, description: 'Não autenticado.' })
  @ApiResponse({ status: 404, description: 'Artigo não encontrado.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.remove(id);
  }
}
