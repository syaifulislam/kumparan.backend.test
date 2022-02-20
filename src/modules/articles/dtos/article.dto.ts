import { Allow, IsNotEmpty, IsString } from 'class-validator';
import { IListArticle } from '../domains/article.domain';
abstract class BaseResponse {
  message: string;
  status: boolean;
  statusCode: number;
}

export class GetListArticleQuery {
  @Allow()
  query: string;

  @Allow()
  author: string;
}

export class GetListArticleResponse extends BaseResponse {
  data: IListArticle[]
}

export class CreateArticleRequest {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsNotEmpty()
  @IsString()
  author: string;
}

export class CreateArticleResponse extends BaseResponse{}