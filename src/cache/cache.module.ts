import { Module } from '@nestjs/common';
import { CacheModule as CacheModuleNest } from '@nestjs/cache-manager';
import { CacheService } from './cache.service';

@Module({
  imports: [
    CacheModuleNest.register({
      ttl: 900000000,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule { }
