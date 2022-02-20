import { CacheModuleOptions, CacheOptionsFactory, Injectable } from "@nestjs/common";
import { ConfigService } from './config.service';
const config = new ConfigService()
@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  createCacheOptions(): CacheModuleOptions {
    return config.redisConfig
  }
}