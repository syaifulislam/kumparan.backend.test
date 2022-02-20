import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { ConfigService } from './config.service';
const config = new ConfigService()
@Injectable()
export class TypeOrmConfigServices implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return config.typeOrmConfig;
  }
}