import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
export declare class ArticlesService {
    private articlesRepository;
    constructor(articlesRepository: Repository<Article>);
    findAll(category?: string): Promise<Article[]>;
    findOne(id: number): Promise<Article>;
    create(dto: CreateArticleDto): Promise<Article>;
    update(id: number, dto: UpdateArticleDto): Promise<Article>;
    remove(id: number): Promise<void>;
}
