
interface IArticle {
  id: number;
  title: string;
  body: string;
  author: string;
  created: Date;
}

interface ICreateArticle {
  title: string;
  body: string;
  author: string;
}

export interface IListArticle {
  title: string;
  body: string;
  author: string;
  created: Date;
}

export class Article {
  protected id: number;
  protected title: string;
  protected body: string;
  protected author: string;
  protected created: Date;

  fromJSON(data: IArticle): void {
    this.id = data.id;
    this.title = data.title;
    this.body = data.body;
    this.author = data.author;
    this.created = data.created;
  }

  toJSON(): IArticle {
    return {
      id: this.id,
      title: this.title,
      body: this.body,
      author: this.author,
      created: this.created,
    }
  }

  create(data: ICreateArticle): void {
    this.title = data.title;
    this.body = data.body;
    this.author = data.author;
  }

  toListArticle(): IListArticle {
    return {
      title: this.title,
      body: this.body,
      author: this.author,
      created: this.created,
    }
  }

  getBody(): string {
    return this.body;
  }

  getTitle(): string {
    return this.title;
  }

  getAuthor(): string {
    return this.author;
  }
}