import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { GetListArticleResponse, CreateArticleResponse, CreateArticleRequest, GetListArticleQuery } from '../dtos/article.dto';
import { ArticleService } from '../services/article.service';
@Controller('v1/articles')
export class ArticleController {
  constructor(
    private readonly service: ArticleService
  ) {}

  @Get('/')
  async getListArticle(@Query() queries: GetListArticleQuery): Promise<GetListArticleResponse> {
    return {
      data: await this.service.listArticle(queries),
      message: 'Success',
      status: true,
      statusCode: HttpStatus.OK
    };
  }


  @Post('/')
  async createArticle(@Body() body: CreateArticleRequest): Promise<CreateArticleResponse> {
    await this.service.createArticle(body)
    return {
      message:'Success',
      status: true,
      statusCode: HttpStatus.OK
    }
  }
}
