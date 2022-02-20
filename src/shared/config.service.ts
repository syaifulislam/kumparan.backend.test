import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
export class ConfigService {
  public get(key: string): string {
    return process.env[key];
  }

  public getNumber(key: string): number {
    return Number(this.get(key));
  }

  get nodeEnv(): string {
    return this.get('NODE_ENV') || 'development';
  }

  get isSynchronize(): string {
    return this.get('IS_SYNCHRONIZE') || 'true';
  }

  get typeOrmConfig(): TypeOrmModuleOptions {
    let entities = [__dirname + '/../modules/**/entities/*.entity{.ts,.js}'];
    let migrations = [__dirname + '/../migrations/*{.ts,.js}'];
    if ((module as any).hot) {
      const entityContext = (require as any).context(
        './../../modules',
        true,
        /\.entity\.ts$/,
      );
      entities = entityContext.keys().map((id) => {
        const entityModule = entityContext(id);
        const [entity] = Object.values(entityModule);
        return entity;
      });
      const migrationContext = (require as any).context(
        './../../migrations',
        false,
        /\.ts$/,
      );
      migrations = migrationContext.keys().map((id) => {
        const migrationModule = migrationContext(id);
        const [migration] = Object.values(migrationModule);
        return migration;
      });
    }
    return {
      entities,
      migrations,
      keepConnectionAlive: true,
      type: 'mysql',
      host: this.get('MYSQL_HOST'),
      port: this.getNumber('MYSQL_PORT'),
      username: this.get('MYSQL_USERNAME'),
      password: this.get('MYSQL_PASSWORD'),
      database: this.get('MYSQL_DATABASE'),
      migrationsRun: false,
      synchronize: this.isSynchronize === 'true',
      logging: this.nodeEnv === 'development',
      charset: 'utf8mb4_general_ci',
      extra: {
        charset: 'utf8mb4_general_ci',
      },
    };
  }

  get redisConfig(): any {
    return {
      store: redisStore,
      host: this.get('REDIS_HOST'),
      port: this.get('REDIS_PORT'),
      ttl: this.get('REDIS_TTL'),
      environment: this.get('REDIS_ENVIRONMENT'),
    };
  }
}
