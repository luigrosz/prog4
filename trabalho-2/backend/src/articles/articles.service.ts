import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
  ) {}

  findAll(category?: string): Promise<Article[]> {
    const where = category ? { category } : {};
    return this.articlesRepository.find({
      where,
      order: { sortOrder: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Article> {
    const article = await this.articlesRepository.findOneBy({ id });
    if (!article) {
      throw new NotFoundException(`Article #${id} not found`);
    }
    return article;
  }

  create(dto: CreateArticleDto): Promise<Article> {
    const article = this.articlesRepository.create(dto);
    return this.articlesRepository.save(article);
  }

  async update(id: number, dto: UpdateArticleDto): Promise<Article> {
    const article = await this.findOne(id);
    Object.assign(article, dto);
    return this.articlesRepository.save(article);
  }

  async remove(id: number): Promise<void> {
    const article = await this.findOne(id);
    await this.articlesRepository.remove(article);
  }
}
