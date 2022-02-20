import { Injectable, Inject, CACHE_MANAGER, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ArticleEntity } from '../entities/article.entity';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { CreateArticleRequest, GetListArticleQuery } from '../dtos/article.dto';
import { Article, IListArticle } from '../domains/article.domain';
import { ArticleErrorMessage, ARTICLE_KEY_REDIS } from '../articles.constant';
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly repo: Repository<ArticleEntity>,
    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,
  ){}

  private async CacheReindex(): Promise<Article[]> {
    const getArticleFromDatabase = await this.repo.find();
    const articles: Article[] = getArticleFromDatabase.map(item => {
      const article = new Article();
      article.fromJSON(item);
      return article;
    });
    this.cache.set(ARTICLE_KEY_REDIS, JSON.stringify(articles));
    return articles;
  }

  private async CacheGetRecords(): Promise<Article[]> {
    let getArticleFromCache = await this.cache.get(ARTICLE_KEY_REDIS);
    if (!getArticleFromCache) getArticleFromCache = JSON.stringify(await this.CacheReindex());
    const recordDomain: Article[] = JSON.parse(getArticleFromCache).map(item => {
      const article = new Article();
      article.fromJSON(item);
      return article;
    })
    return recordDomain;
  }

  async createArticle(body: CreateArticleRequest): Promise<void> {
    const getRecords = await this.CacheGetRecords();
    const checkDuplicate = getRecords.find(item => item.getTitle() === body.title)
    if (checkDuplicate) {
      throw new BadRequestException(ArticleErrorMessage.DUPLICATE_ARTICLE_TITLE)
    }
    const article = new Article();
    article.create(body);

    await this.repo.save(this.repo.create({...article}));
    this.CacheReindex();
  }

  async listArticle(queries: GetListArticleQuery): Promise<IListArticle[]> {
    const {
      query, 
      author
    } = queries
    let getRecords = await this.CacheGetRecords();
    if (query) {
      getRecords = getRecords.filter(
        item => 
          item.getBody().toLocaleLowerCase().includes(query) ||
          item.getTitle().toLocaleLowerCase().includes(query))
    }

    if (author) {
      getRecords = getRecords.filter(item => item.getAuthor() === author)
    }
    const recordDomain: IListArticle[] = getRecords.map(item => item.toListArticle())
    return recordDomain;
  }
}