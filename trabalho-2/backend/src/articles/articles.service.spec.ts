import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ArticlesService } from './articles.service';
import { Article } from './entities/article.entity';

describe('ArticlesService', () => {
  let service: ArticlesService;
  let repo: Repository<Article>;

  const mockArticle: Article = {
    id: 1,
    title: 'Test Title',
    content: 'Test content body.',
    imageUrl: 'img/test.webp',
    sortOrder: 10,
    category: 'test',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepo = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        {
          provide: getRepositoryToken(Article),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
    repo = module.get<Repository<Article>>(getRepositoryToken(Article));
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('deve retornar todos os artigos ordenados por sortOrder ASC', async () => {
      const articles = [mockArticle];
      mockRepo.find.mockResolvedValue(articles);

      const result = await service.findAll();
      expect(result).toEqual(articles);
      expect(mockRepo.find).toHaveBeenCalledWith({
        where: {},
        order: { sortOrder: 'ASC' },
      });
    });

    it('deve filtrar por categoria quando informada', async () => {
      mockRepo.find.mockResolvedValue([mockArticle]);

      await service.findAll('test');
      expect(mockRepo.find).toHaveBeenCalledWith({
        where: { category: 'test' },
        order: { sortOrder: 'ASC' },
      });
    });

    it('deve retornar array vazio quando não há artigos', async () => {
      mockRepo.find.mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('deve retornar artigo pelo ID', async () => {
      mockRepo.findOneBy.mockResolvedValue(mockArticle);

      const result = await service.findOne(1);
      expect(result).toEqual(mockArticle);
      expect(mockRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('deve lançar NotFoundException quando artigo não existe', async () => {
      mockRepo.findOneBy.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(999)).rejects.toThrow(
        'Article #999 not found',
      );
    });
  });

  describe('create', () => {
    it('deve criar e salvar um novo artigo', async () => {
      const dto = { title: 'Novo', content: 'Conteúdo novo' };
      mockRepo.create.mockReturnValue(mockArticle);
      mockRepo.save.mockResolvedValue(mockArticle);

      const result = await service.create(dto);
      expect(result).toEqual(mockArticle);
      expect(mockRepo.create).toHaveBeenCalledWith(dto);
      expect(mockRepo.save).toHaveBeenCalledWith(mockArticle);
    });

    it('deve criar artigo com todos os campos opcionais', async () => {
      const dto = {
        title: 'Completo',
        content: 'Conteúdo completo',
        imageUrl: 'img/x.webp',
        sortOrder: 99,
        category: 'extra',
      };
      mockRepo.create.mockReturnValue({ ...mockArticle, ...dto });
      mockRepo.save.mockResolvedValue({ ...mockArticle, ...dto });

      const result = await service.create(dto);
      expect(result.title).toBe('Completo');
      expect(result.imageUrl).toBe('img/x.webp');
      expect(result.sortOrder).toBe(99);
      expect(result.category).toBe('extra');
    });
  });

  describe('update', () => {
    it('deve atualizar artigo existente', async () => {
      const dto = { title: 'Atualizado' };
      const updated = { ...mockArticle, title: 'Atualizado' };

      mockRepo.findOneBy.mockResolvedValue(mockArticle);
      mockRepo.save.mockResolvedValue(updated);

      const result = await service.update(1, dto);
      expect(result.title).toBe('Atualizado');
      expect(mockRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(mockRepo.save).toHaveBeenCalled();
    });

    it('deve lançar NotFoundException ao atualizar artigo inexistente', async () => {
      mockRepo.findOneBy.mockResolvedValue(null);

      await expect(
        service.update(999, { title: 'X' }),
      ).rejects.toThrow(NotFoundException);
      expect(mockRepo.save).not.toHaveBeenCalled();
    });

    it('não deve sobrescrever campos não enviados', async () => {
      mockRepo.findOneBy.mockResolvedValue(mockArticle);
      mockRepo.save.mockResolvedValue(mockArticle);

      await service.update(1, {});
      // content should remain unchanged since empty dto
      expect(mockRepo.save).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('deve remover artigo existente', async () => {
      mockRepo.findOneBy.mockResolvedValue(mockArticle);
      mockRepo.remove.mockResolvedValue(mockArticle);

      await service.remove(1);
      expect(mockRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(mockRepo.remove).toHaveBeenCalledWith(mockArticle);
    });

    it('deve lançar NotFoundException ao remover artigo inexistente', async () => {
      mockRepo.findOneBy.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(mockRepo.remove).not.toHaveBeenCalled();
    });
  });
});
