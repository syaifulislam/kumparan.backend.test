import { Global, Module } from '@nestjs/common';
import { MODULES } from '../modules';
import { ConfigService } from './config.service';

const providers = [ConfigService]
@Global()
@Module({
  providers,
  imports: [...MODULES],
})
export class SharedModule {}
