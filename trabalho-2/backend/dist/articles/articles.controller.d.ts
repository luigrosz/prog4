import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
export declare class ArticlesController {
    private readonly articlesService;
    constructor(articlesService: ArticlesService);
    findAll(category?: string): Promise<Article[]>;
    findOne(id: number): Promise<Article>;
    create(dto: CreateArticleDto): Promise<Article>;
    update(id: number, dto: UpdateArticleDto): Promise<Article>;
    remove(id: number): Promise<void>;
}
