import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

describe('ArticlesController', () => {
  let controller: ArticlesController;
  let service: ArticlesService;

  const mockArticle = {
    id: 1,
    title: 'Test Title',
    content: 'Test content.',
    imageUrl: null,
    sortOrder: 10,
    category: 'test',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [
        {
          provide: ArticlesService,
          useValue: mockService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<ArticlesController>(ArticlesController);
    service = module.get<ArticlesService>(ArticlesService);
    jest.clearAllMocks();
  });

  describe('GET /api/articles', () => {
    it('deve retornar lista de artigos', async () => {
      mockService.findAll.mockResolvedValue([mockArticle]);

      const result = await controller.findAll();
      expect(result).toEqual([mockArticle]);
      expect(mockService.findAll).toHaveBeenCalledWith(undefined);
    });

    it('deve passar query category para o serviço', async () => {
      mockService.findAll.mockResolvedValue([mockArticle]);

      await controller.findAll('personagens');
      expect(mockService.findAll).toHaveBeenCalledWith('personagens');
    });

    it('deve retornar array vazio', async () => {
      mockService.findAll.mockResolvedValue([]);

      const result = await controller.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('GET /api/articles/:id', () => {
    it('deve retornar artigo por ID', async () => {
      mockService.findOne.mockResolvedValue(mockArticle);

      const result = await controller.findOne(1);
      expect(result).toEqual(mockArticle);
      expect(mockService.findOne).toHaveBeenCalledWith(1);
    });

    it('deve propagar NotFoundException do serviço', async () => {
      mockService.findOne.mockRejectedValue(
        new NotFoundException('Article #999 not found'),
      );

      await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('POST /api/articles', () => {
    it('deve criar artigo via serviço', async () => {
      const dto: CreateArticleDto = {
        title: 'Novo',
        content: 'Conteúdo novo',
        category: 'blog',
      };
      mockService.create.mockResolvedValue({ ...mockArticle, ...dto });

      const result = await controller.create(dto);
      expect(result.title).toBe('Novo');
      expect(result.category).toBe('blog');
      expect(mockService.create).toHaveBeenCalledWith(dto);
    });

    it('deve criar artigo com campos mínimos (apenas título e conteúdo)', async () => {
      const dto: CreateArticleDto = {
        title: 'Mínimo',
        content: 'Conteúdo mínimo',
      };
      mockService.create.mockResolvedValue({
        ...mockArticle,
        ...dto,
        imageUrl: null,
        sortOrder: 0,
        category: null,
      });

      const result = await controller.create(dto);
      expect(result.title).toBe('Mínimo');
      expect(mockService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('PUT /api/articles/:id', () => {
    it('deve atualizar artigo via serviço', async () => {
      const dto: UpdateArticleDto = { title: 'Atualizado' };
      mockService.update.mockResolvedValue({
        ...mockArticle,
        title: 'Atualizado',
      });

      const result = await controller.update(1, dto);
      expect(result.title).toBe('Atualizado');
      expect(mockService.update).toHaveBeenCalledWith(1, dto);
    });

    it('deve propagar NotFoundException ao atualizar inexistente', async () => {
      mockService.update.mockRejectedValue(
        new NotFoundException('Article #999 not found'),
      );

      await expect(controller.update(999, {})).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('DELETE /api/articles/:id', () => {
    it('deve remover artigo via serviço', async () => {
      mockService.remove.mockResolvedValue(undefined);

      await controller.remove(1);
      expect(mockService.remove).toHaveBeenCalledWith(1);
    });

    it('deve propagar NotFoundException ao remover inexistente', async () => {
      mockService.remove.mockRejectedValue(
        new NotFoundException('Article #999 not found'),
      );

      await expect(controller.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
