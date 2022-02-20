import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesControllers } from './controllers';
import { ArticlesEntities } from './entities';
import { ArticlesServices } from './services';
import { ConfigService } from '../../shared/config.service';
import { CacheConfigService } from '../../shared/cache.config';
@Module({
  controllers: [...ArticlesControllers],
  imports: [
    TypeOrmModule.forFeature([...ArticlesEntities]),
    CacheModule.registerAsync({
      useClass: CacheConfigService,
      inject: [ConfigService],
    }),
  ],
  providers: [...ArticlesServices],
})
export class ArticlesModule {}
